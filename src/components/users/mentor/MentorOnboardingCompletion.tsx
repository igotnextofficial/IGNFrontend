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
        Something went wrong while completing your onboarding. Please try again
        or contact support if the issue continues.
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

const MentorOnboardingSuccess = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/dashboard';
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={8}>
        <Typography variant="h4" gutterBottom color="primary">
          Mentor Onboarding Successful
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for completing the onboarding process!
        </Typography>
        <Typography variant="caption" mt={1} display="block">
          Redirecting to your dashboard in 5 seconds...
        </Typography>
        <Button
          variant="contained"
          color="success"
          href="/dashboard"
          sx={{ mt: 2 }}
        >
          Go Now
        </Button>
      </Box>
    </Container>
  );
};

export default function MentorOnboardingCompletion() {
  const { user,accessToken } = useUser();
  const { post } = useHttp();
  const [success, setSuccess] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const completeOnboarding = async () => {
      if (!user) return false;
      const url = APP_ENDPOINTS.USER.MENTOR.ONBOARDING_COMPLETION.replace(
        ':user_id',
        user.id
      );
      try {
        const response = await post(url, {}, { 
            requiresAuth: true,
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
          });
        return response?.status === 200;
      } catch (error) {
        console.error('Error completing onboarding:', error);
        return false;
      }
    };

    completeOnboarding().then(setSuccess);
  }, [user?.id, post]);

  if (success === null) {
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

  return success ? <MentorOnboardingSuccess /> : <FailedMentorOnboarding />;
}
