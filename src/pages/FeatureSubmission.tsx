import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { keyframes } from '@mui/system';
import IgnFormGenerate from '../components/IgnFormGenerate';
import { FeatureSubmissionFormStructure } from '../formstructures/FeatureSubmissionFormStructure';
import FormDataProvider from '../providers/FormDataProvider';
import IGNButton from '../components/Button';
import { useFormDataContext } from '../contexts/FormContext';
import { httpDataObject, HttpMethods } from '../types/DataTypes';
import { sendRequest } from '../utils/helpers';
import { useErrorHandler } from '../contexts/ErrorContext';

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

const FeatureSubmissionForm = () => {
  const { data } = useFormDataContext();
  const { updateError } = useErrorHandler();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      });

      const requestData: httpDataObject = {
        data: Object.fromEntries(formData.entries())
      };

      const response = await sendRequest(
        HttpMethods.POST,
        `${process.env.REACT_APP_API_URL}/feature-submissions`,
        requestData
      );

      if (response) {
        // Handle successful submission
        alert('Thank you for your submission! We will review it and get back to you soon.');
      }
    } catch (error) {
      updateError(error instanceof Error ? error.message : 'An error occurred while submitting your form.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            component="form" 
            onSubmit={handleSubmit}
            sx={{ 
              animation: `${fadeIn} 0.8s ease-out 0.8s both`
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <IgnFormGenerate formStructures={FeatureSubmissionFormStructure} />
              </Grid>
              
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <IGNButton 
                  buttonLabel={isSubmitting ? 'Submitting...' : 'Submit for Review'}
                  disabled={isSubmitting}
                  type="submit"
                  sx={{
                    backgroundColor: '#1d1917',
                    color: '#FBFAF9',
                    '&:hover': {
                      backgroundColor: '#2d2927'
                    },
                    minWidth: '200px',
                    height: '48px',
                    borderRadius: '4px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

const FeatureSubmission = () => {
  return (
    <FormDataProvider>
      <FeatureSubmissionForm />
    </FormDataProvider>
  );
};

export default FeatureSubmission; 