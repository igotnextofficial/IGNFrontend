import React from 'react';
import { Box, Container, Typography, Grid, Paper, Divider } from '@mui/material';
import { AboutIGN } from '../staticinformation/aboutus';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const About = () => {
  const features = [
    {
      icon: <MusicNoteIcon sx={{ fontSize: 40, color: '#fd2f30' }} />,
      title: "Music Discovery",
      description: "Uncover the next generation of musical talent and connect with emerging artists."
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: '#fd2f30' }} />,
      title: "Community Building",
      description: "Join a vibrant community of artists, mentors, and music enthusiasts."
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#fd2f30' }} />,
      title: "Mentorship",
      description: "Learn from industry professionals and accelerate your artistic journey."
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#fd2f30' }} />,
      title: "Recognition",
      description: "Get featured and gain exposure through our platform's spotlight."
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#FBFAF9',
      pt: { xs: 4, md: 8 }
    }}>
      {/* Hero Section */}
      <Box sx={{
        backgroundImage: "url('/images/ign_background_about_v1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '40vh', md: '60vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              color: '#fff',
              position: 'relative',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            About IGN Magazine
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 1 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, md: 6 },
            borderRadius: 2,
            backgroundColor: '#fff'
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 600,
              color: '#1d1917',
              mb: 4,
              textAlign: 'center'
            }}
          >
            {AboutIGN.title}
          </Typography>
          
          {AboutIGN.content.split('\n\n').map((paragraph, index) => (
            <Typography 
              key={index}
              paragraph
              sx={{ 
                fontSize: { xs: '1.1rem', md: '1.2rem' },
                lineHeight: 1.8,
                color: '#4a4a4a',
                mb: 3
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Paper>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontWeight: 600,
            color: '#1d1917',
            mb: 6,
            textAlign: 'center'
          }}
        >
          What We Offer
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box 
                sx={{ 
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {feature.icon}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mt: 2,
                    mb: 2,
                    fontWeight: 600,
                    color: '#1d1917'
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  sx={{ 
                    color: '#4a4a4a',
                    lineHeight: 1.6
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ 
        backgroundColor: '#1d1917',
        py: 8,
        mt: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #fd2f30, #ff6347)',
        }
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#fff',
              textAlign: 'center',
              mb: 3,
              fontWeight: 600,
              fontSize: { xs: '1.8rem', md: '2.2rem' }
            }}
          >
            Ready to Join Our Community?
          </Typography>
          <Typography 
            sx={{ 
              color: '#FBFAF9',
              textAlign: 'center',
              maxWidth: '600px',
              mx: 'auto',
              opacity: 0.9,
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              lineHeight: 1.8
            }}
          >
            Whether you're an aspiring artist or an experienced mentor, IGN Magazine is the perfect platform to grow your career and make meaningful connections in the music industry.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default About; 