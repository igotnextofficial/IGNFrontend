import React, { useEffect, useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import useHttp from '../../../customhooks/useHttp';
import { APP_ENDPOINTS } from '../../../config/app';
import { UserDataType } from '../../../types/DataTypes';
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';
import IGNButton from '../../common/IGNButton';
import { CheckCircle, Error } from '@mui/icons-material';

const FailedMentorOnboarding = () => (
  <Container maxWidth="sm">
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 }
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          backgroundColor: '#fff',
          textAlign: 'center',
          maxWidth: 500,
          width: '100%'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Error 
            sx={{ 
              fontSize: 80, 
              color: '#d32f2f',
              mb: 2
            }} 
          />
        </Box>
        
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: '#1d1917',
            mb: 2
          }}
        >
          Mentor Onboarding Failed
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#4a4a4a',
            lineHeight: 1.6,
            mb: 4,
            fontSize: '1.1rem'
          }}
        >
          We could not confirm your onboarding. Please try again or contact support if the issue persists.
        </Typography>
        
        <IGNButton 
          onClick={() => window.location.href = '/dashboard'}
          fullWidth={false}
        >
          Return to Dashboard
        </IGNButton>
      </Paper>
    </Box>
  </Container>
);
interface MentorOnboardingSuccessProps {
  user: UserDataType;
}

const MentorOnboardingSuccess = ({ user }: MentorOnboardingSuccessProps) => (
  <Container maxWidth="sm">
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 }
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          backgroundColor: '#fff',
          textAlign: 'center',
          maxWidth: 500,
          width: '100%'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <CheckCircle 
            sx={{ 
              fontSize: 80, 
              color: '#2e7d32',
              mb: 2
            }} 
          />
        </Box>
        
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: '#1d1917',
            mb: 2
          }}
        >
          Mentor Onboarding Successful
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#4a4a4a',
            lineHeight: 1.6,
            mb: 4,
            fontSize: '1.1rem'
          }}
        >
          Thank you for completing the onboarding process! You're now ready to start mentoring and helping others grow in their careers.
        </Typography>
        
        <IGNButton 
          onClick={() => window.location.href = `/dashboard/${user?.role?.type.toLowerCase()}`}
          fullWidth={false}
        >
          Return to Dashboard
        </IGNButton>
      </Paper>
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
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error('Error completing onboarding:', error);
        setStatus('failed');
      }
    };

    completeOnboarding();
  }, [user?.id, accessToken, post]);

  if (status === 'loading') {
    return (
      <Container maxWidth="sm">
        <Box 
          sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            py: { xs: 4, md: 8 },
            px: { xs: 2, md: 4 }
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              backgroundColor: '#fff',
              textAlign: 'center',
              maxWidth: 500,
              width: '100%'
            }}
          >
            <Box sx={{ mb: 4 }}>
              <CircularProgress 
                size={60}
                sx={{ 
                  color: '#1d1917',
                  mb: 2
                }} 
              />
            </Box>
            
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: '#1d1917',
                mb: 2
              }}
            >
              Finalizing Your Onboarding
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#4a4a4a',
                lineHeight: 1.6,
                fontSize: '1.1rem'
              }}
            >
              Please wait while we complete your mentor onboarding process...
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (status === 'failed') return <FailedMentorOnboarding />;

   return <MentorOnboardingSuccess user={user!} />;
}
