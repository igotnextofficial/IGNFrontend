import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: '#1d1917',
        color: '#FBFAF9',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Your premier destination for discovering and celebrating the next generation of artists and entertainers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#ff6347' } }}>
                Discover
              </Link>
              <Link component={RouterLink} to="/articles/whos-next" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#ff6347' } }}>
                Rising Stars
              </Link>
              <Link component={RouterLink} to="/articles/featured-artists" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#ff6347' } }}>
                Spotlight
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#ff6347' } }}>
                Instagram
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#ff6347' } }}>
                Twitter
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#ff6347' } }}>
                LinkedIn
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.1)' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} I Got Next. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#ff6347' } }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: '#ff6347' } }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 