import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IGNButton from '../common/IGNButton';

const AboutIntroSection = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 8, bgcolor: '#FBFAF9', color: '#1d1917',borderTop: '3px solid #fd2f30' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1d1917' }}
        >
          Bridging the Gap in Entertainment
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            mb: 4,
            color: '#1d1917',
          }}
        >
          IGotNext Magazine connects emerging artists with seasoned mentors across the entertainment world.
          From insightful articles to curated guidance, we empower the next generation of talent to rise.
        </Typography>

        <IGNButton onClick={() => navigate('/about')} fullWidth={false}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              width: '250px',
              justifyContent: 'center',
              color: '#FBFAF9',
            }}
          >
            Learn More
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 12L12 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </IGNButton>
      </Container>
    </Box>
  );
};

export default AboutIntroSection;
