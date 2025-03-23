import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { MentorDataType } from '../../../types/DataTypes';

interface MentorListComponentProps {
  mentors: MentorDataType[];
}

const MentorListComponent = ({ mentors }: MentorListComponentProps) => {
  return (
    <Grid container spacing={4}>
      {mentors.map((mentor: MentorDataType) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={mentor.id}>
          {/* Perspective Container */}
          <Box sx={{ perspective: '1000px' }}>
            {/* Flip Container */}
            <Box
              sx={{
                height: 450,
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s ease-in-out',
                '&:hover': {
                  transform: 'rotateY(180deg)',
                },
              }}
            >
              {/* Front of card */}
              <Card 
                sx={{ 
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  backfaceVisibility: 'hidden',
                }}
              >
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
                    borderRadius: 1,
                    zIndex: 1
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    ${mentor.product.price}
                  </Typography>
                </Box>

                <CardMedia
                  component="img"
                  height="200"
                  image={mentor.profile_photo_path}
                  alt={mentor.fullname}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {mentor.fullname}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      @{mentor.username}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {mentor.availability ? 'Available Now' : 'Not Available'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {mentor.specialties.slice(0, 3).map((specialty) => (
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
              </Card>

              {/* Back of card */}
              <Card 
                sx={{ 
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  bgcolor: 'black',
                  color: 'white',
                }}
              >
                <CardContent sx={{ 
                  height: '100%',
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: 3
                }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    {mentor.fullname}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, flex: 1, overflow: 'auto' }}>
                    {mentor.bio}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="h6" sx={{ color: '#00ff00', mb: 1 }}>
                      ${mentor.product.price}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {mentor.product.name}
                    </Typography>
                    <Typography variant="body2">
                      {mentor.product.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default MentorListComponent; 