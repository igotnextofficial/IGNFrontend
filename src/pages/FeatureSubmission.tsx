import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { keyframes } from '@mui/system';
import FeaturedSubmissionForm from '../forms/FeaturedSubmissionForm';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeatureSubmission = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#FBFAF9',
      pt: { xs: 4, md: 8 }
    }}>
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, md: 6 },
            borderRadius: 2,
            backgroundColor: '#fff'
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 600,
              color: '#1d1917',
              mb: 2,
              textAlign: 'center',
              animation: `${fadeIn} 0.8s ease-out 0.4s both`
            }}
          >
            Want to be Featured?
          </Typography>
          
          <Typography 
            sx={{ 
              color: '#4a4a4a',
              textAlign: 'center',
              mb: 4,
              animation: `${fadeIn} 0.8s ease-out 0.6s both`
            }}
          >
            Share your music and story with our community. Fill out the form below to submit your profile for consideration.
          </Typography>

          <Box 
            sx={{ 
              animation: `${fadeIn} 0.8s ease-out 0.8s both`
            }}
          >
            <FeaturedSubmissionForm />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FeatureSubmission; 