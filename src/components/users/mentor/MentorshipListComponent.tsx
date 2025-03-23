import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Chip, CircularProgress, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMentors } from '../../../customhooks/useMentors';
import { MentorDataType } from '../../../types/DataTypes';

const MentorshipListComponent = () => {
  const { mentors, loading, error } = useMentors();
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const filteredMentors = mentors.filter((mentor) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      mentor.fullname.toLowerCase().includes(searchTerm) ||
      mentor.username?.toLowerCase().includes(searchTerm) ||
      mentor.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm)) ||
      mentor.bio?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <Box>
      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
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

      <Grid container spacing={3}>
        {filteredMentors.map((mentor: MentorDataType) => (
          <Grid item xs={12} key={mentor.id}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
              <CardMedia
                component="img"
                sx={{
                  width: { xs: '100%', sm: 200 },
                  height: { xs: 200, sm: 200 },
                  objectFit: 'cover'
                }}
                image={mentor.profile_photo_path}
                alt={mentor.fullname}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ flex: '1 0 auto', position: 'relative' }}>
                  {/* Price Tag */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: 'black',
                      color: 'white',
                      py: 1,
                      px: 2,
                      borderRadius: 1
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      ${mentor.product.price}
                    </Typography>
                  </Box>

                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    {mentor.fullname}
                  </Typography>
                  
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                    @{mentor.username}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {mentor.bio}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: mentor.availability ? 'success.main' : 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      {mentor.availability ? '● Available Now' : '○ Not Available'}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {mentor.product.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {mentor.specialties.map((specialty) => (
                      <Chip 
                        key={specialty} 
                        label={specialty} 
                        size="small"
                        sx={{
                          bgcolor: 'black',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'black',
                          }
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MentorshipListComponent; 