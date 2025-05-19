import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import MentorListComponent from '../users/mentor/MentorListComponent';
import { useMentors } from '../../customhooks/useMentors';

const FeaturedMentors = () => {
  const { mentors, loading, error } = useMentors();
  useEffect(() => {
    if (mentors) {
      console.log('Mentors:', mentors);
    }
  }, [mentors]);
  if (loading || error) return null; // We don't show this section if there's  

  return (
    <Box sx={{ 
      bgcolor: '#f5f5f5', 
      py: 8, 
      px: { xs: 4, md: 8 },
      borderRadius: 2,
      boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)'
    }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: 'black'
          }}
        >
          Meet Our Amazing Mentors
        </Typography>
        <Typography
          variant="h6"
          sx={{ maxWidth: '800px' }}
        >
          Learn from experienced professionals who are passionate about helping you succeed
        </Typography>
      </Box>

      <MentorListComponent mentors={mentors || []} />
    </Box>
  );
};

export default FeaturedMentors; 