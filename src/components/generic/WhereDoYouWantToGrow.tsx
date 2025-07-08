import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MicIcon from '@mui/icons-material/Mic';
import MovieIcon from '@mui/icons-material/Movie';
import BrushIcon from '@mui/icons-material/Brush';

const categories = [
  {
    title: 'Music Production',
    image: '/images/categories/music.jpg',
    icon: <MusicNoteIcon sx={{ fontSize: 40, color: '#fff' }} />,
    iconBg: '#F44336'
  },
  {
    title: 'Artist Development',
    image: '/images/categories/artist.jpg',
    icon: <MicIcon sx={{ fontSize: 40, color: '#fff' }} />,
    iconBg: '#E53935'
  },
  {
    title: 'Filmmaking',
    image: '/images/categories/film.jpg',
    icon: <MovieIcon sx={{ fontSize: 40, color: '#fff' }} />,
    iconBg: '#FFB300'
  },
  {
    title: 'Branding',
    image: '/images/categories/branding.jpg',
    icon: <BrushIcon sx={{ fontSize: 40, color: '#fff' }} />,
    iconBg: '#F44336'
  }
];

const WhereDoYouWantToGrow: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ backgroundColor: '#111', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{ color: '#fff', mb: 1 }}
        >
          Where Do You Want to Grow?
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ color: '#ccc', mb: 4, maxWidth: isMobile ? '100%' : '600px', mx: 'auto' }}
        >
          Explore our categories to find the right mentorship and resources to elevate your career in the creative industry.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)'
                  }
                }}
              >
                {/* Image */}
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.title}
                  sx={{ height: 160, width: '100%', objectFit: 'cover' }}
                />

                {/* Icon */}
                <Box
                  sx={{
                    mt: -3.5,
                    mb: 1.5,
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: category.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                  }}
                >
                  {category.icon}
                </Box>

                {/* Title */}
                <Box
                  sx={{
                    pb: 3,
                    px: 2,
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: '#111' }}
                  >
                    {category.title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhereDoYouWantToGrow;
