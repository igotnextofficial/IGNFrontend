import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const BecomeMentorSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        width: '100%',
        backgroundImage: 'url("/images/become-a-mentor.jpg")', // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        py: { xs: 1, md: 2 },
        px: { xs: 2, md: 6 },
        color: '#1d1917',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(238, 184, 44, 0.8)', // $darker-yellow-color-opaque
          p: { xs: 4, md: 8 },
          borderRadius: 3,
          maxWidth: '700px',
          ml: 'auto',
        }}
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
            sx={{ color: '#1d1917' }}
          >
            Become a Mentor
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: '#1d1917', fontSize: '1.1rem', lineHeight: 1.7 }}
          >
            Share your journey. Guide the next wave of creatives. Join our platform and inspire the next generation of industry leaders.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/become-a-mentor"
            sx={{
              backgroundColor: '#f2c85b', // $primary-yellow-color
              color: '#1d1917',            // $primary-black-color
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#eeb82c', // $darker-yellow-color
              },
            }}
          >
            Apply Now
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default BecomeMentorSection;
