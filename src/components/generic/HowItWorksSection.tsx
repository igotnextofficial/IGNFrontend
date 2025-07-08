import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  Paper,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <SearchIcon sx={{ fontSize: 32, color: '#000' }} />,
      title: 'Browse',
      description:
        'Explore mentors by mastery, skillset, or popularity to find the perfect match for your goals.'
    },
    {
      icon: <CalendarIcon sx={{ fontSize: 32, color: '#000' }} />,
      title: 'Book',
      description:
        'Schedule one-on-one sessions with your chosen mentor at times that work for both of you.'
    },
    {
      icon: <TrendingIcon sx={{ fontSize: 32, color: '#000' }} />,
      title: 'Grow',
      description:
        'Learn from industry experts, gain valuable insights, and accelerate your career growth.'
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', py: { xs: 2, md: 2 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          fontWeight="bold"
          sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' }, color: '#040404' }}
        >
          How It Works
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            maxWidth: '600px',
            mx: 'auto',
            mb: { xs: 6, md: 8 },
            fontSize: { xs: '1rem', md: '1.25rem' },
            color: '#666666'
          }}
        >
          Get started with mentorship in three simple steps
        </Typography>

        <Grid container spacing={6}>
          {steps.map((step, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={index}
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: 'transparent',
                  p: 3
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  {step.icon}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: '#040404' }}
                  >
                    {step.title}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    color: '#666666',
                    lineHeight: 1.6
                  }}
                >
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
