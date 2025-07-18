import React, { useEffect, useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import useHttp from '../../../customhooks/useHttp';
import { APP_ENDPOINTS } from '../../../config/app';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';

const FailedMentorOnboarding = () => (
  <Container maxWidth="sm">
    <Box textAlign="center" mt={8}>
      <Typography variant="h4" gutterBottom color="error">
        Mentor Onboarding Failed
      </Typography>
      <Typography variant="body1" gutterBottom>
        We could not confirm your onboarding. Please try again or contact support if the issue persists.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/dashboard"
        sx={{ mt: 2 }}
      >
        Return to Dashboard
      </Button>
    </Box>
  </Container>
);

const MentorOnboardingSuccess = ({ onRedirect }: { onRedirect: () => void }) => (
  <Container maxWidth="sm">
    <Box textAlign="center" mt={8}>
      <Typography variant="h4" gutterBottom color="primary">
        Mentor Onboarding Successful
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for completing the onboarding process!
      </Typography>
      <Typography variant="caption" mt={1} display="block">
        You’ll be redirected shortly.
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={onRedirect}
        sx={{ mt: 2 }}
      >
        Go to Dashboard Now
      </Button>
    </Box>
  </Container>
);

export default function MentorOnboardingCompletion() {
  const { user, accessToken } = useUser();
  const { post } = useHttp();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');

  useEffect(() => {
    if (!user || !accessToken) return;

    const completeOnboarding = async () => {
      const url = APP_ENDPOINTS.USER.MENTOR.ONBOARDING_COMPLETION.replace(':user_id', user.id);
      try {
        const response = await post(url, {}, {
          requiresAuth: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response?.status === 200) {
          setStatus('success');
      
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 5000); // consistent with UI message
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error('Error completing onboarding:', error);
        setStatus('failed');
      }
    };

    completeOnboarding();
  }, [user?.id, accessToken]);

  if (status === 'loading') {
    return (
      <Container maxWidth="sm">
        <Box textAlign="center" mt={10}>
          <CircularProgress />
          <Typography variant="body1" mt={2}>
            Finalizing your mentor onboarding...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (status === 'failed') return <FailedMentorOnboarding />;

  return <MentorOnboardingSuccess onRedirect={() => (window.location.href = '/dashboard')} />;
}
