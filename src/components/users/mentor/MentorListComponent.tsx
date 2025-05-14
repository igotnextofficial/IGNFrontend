import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { MentorDataType } from '../../../types/DataTypes';

interface MentorListComponentProps {
  mentors: MentorDataType[];
}

const formatPrice = (price: number) => {
  // Convert cents to dollars and format as USD
  const dollars = price / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(dollars);
};

const MentorListComponent = ({ mentors }: MentorListComponentProps) => {
  return (
    <Grid container spacing={4}>
      {mentors.map((mentor: MentorDataType) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={mentor.id}>
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative'
          }}>
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
                borderRadius: 2,
                zIndex: 99999,
                boxShadow: 2
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                {formatPrice(mentor.product.price)}
              </Typography>
            </Box>

            <CardMedia
              component="img"
              height="200"
              image={mentor.profile_photo_path}
              alt={mentor.fullname}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
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

              <Typography variant="body2" sx={{ mt: 2 }}>
                {mentor.bio}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MentorListComponent; 