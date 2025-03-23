import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { keyframes } from '@mui/system';
import MentorListComponent from '../../components/users/mentor/MentorListComponent';
import { useMentors } from '../../customhooks/useMentors';

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

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { mentors, loading, error } = useMentors();

  const filteredMentors = mentors?.filter((mentor) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      mentor.fullname.toLowerCase().includes(searchTerm) ||
      mentor.username?.toLowerCase().includes(searchTerm) ||
      mentor.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm)) ||
      mentor.bio?.toLowerCase().includes(searchTerm)
    );
  }) || [];

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#FBFAF9',
      pt: { xs: 4, md: 8 },
      px: { xs: 2, md: 4 }
    }}>
      <Box sx={{ maxWidth: '3600px', mx: 'auto' }}>
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
          Our Mentors
        </Typography>
        
        <Typography 
          sx={{ 
            color: '#4a4a4a',
            textAlign: 'center',
            mb: 4,
            animation: `${fadeIn} 0.8s ease-out 0.6s both`
          }}
        >
          Connect with experienced professionals who are passionate about helping you grow in your artistic journey.
        </Typography>

        {/* Search Bar */}
        <Box 
          sx={{ 
            mb: 6,
            maxWidth: '600px',
            mx: 'auto',
            animation: `${fadeIn} 0.8s ease-out 0.7s both`
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search mentors by name, specialty, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                bgcolor: 'white',
                '& fieldset': {
                  borderColor: 'rgba(0,0,0,0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0,0,0,0.2) !important',
                },
              }
            }}
          />
        </Box>

        <Box sx={{ animation: `${fadeIn} 0.8s ease-out 0.8s both` }}>
          <MentorListComponent mentors={filteredMentors} />
        </Box>
      </Box>
    </Box>
  );
};

export default Mentors; 