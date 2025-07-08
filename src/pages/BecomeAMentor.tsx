import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Link,
  Breadcrumbs,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  NavigateNext,
  CheckCircle,
  MusicNote,
  Movie,
  Brush,
  TheaterComedy,
  CameraAlt,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const BecomeAMentor: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit" underline="hover">
          Home
        </Link>
        <Typography color="#1d1917">Become a Mentor</Typography>
      </Breadcrumbs>

      <Paper elevation={0} sx={{ backgroundColor: '#FBFAF9', p: { xs: 3, md: 6 }, borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: '#1d1917' }}>
            Become a Mentor
          </Typography>
          <Typography variant="h6" color="#8f8f8f" maxWidth="800px" mx="auto">
            At I Got Next Magazine, we're building a creative ecosystem where mentorship transforms lives. If you're a professional in music, film, fashion, or any creative industry and want to give back — we'd love to have you on board.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#1d1917' }}>
              Why Mentor?
            </Typography>
            <Typography variant="body1" color="#1d1917" paragraph>
              Mentorship is more than giving advice — it's about empowering the next generation. As a mentor, you'll:
            </Typography>
            <List>
              {["Share your journey and lessons learned", "Help mentees avoid common pitfalls", "Guide artists as they grow their craft and brand", "Build a legacy by shaping future creatives"].map((text, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemText primary={text} primaryTypographyProps={{ variant: 'body1', color: '#1d1917' }} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#1d1917' }}>
              What's Expected of a Mentor?
            </Typography>
            <Typography variant="body1" color="#1d1917" paragraph>
              We want our mentors to be committed, engaged, and authentic. Here's what we expect:
            </Typography>
            <List>
              {[
                {
                  primary: 'Minimum of 6 sessions per mentee',
                  secondary: 'Help them set meaningful goals and follow through',
                },
                {
                  primary: 'Open and update your availability regularly',
                  secondary: 'Mentees book based on your schedule',
                },
                {
                  primary: 'Professionalism and respect',
                  secondary: 'Be a safe, encouraging presence in their journey',
                },
                {
                  primary: 'Timely responses',
                  secondary: 'Reply to bookings, chats, and session reschedules promptly',
                },
                {
                  primary: 'Share insights',
                  secondary: 'Offer real stories and actionable feedback',
                },
                {
                  primary: 'Promote growth',
                  secondary: 'Encourage mentees to challenge themselves',
                }
              ].map((item, i) => (
                <ListItem key={i} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircle sx={{ color: '#f2c85b' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.primary}
                    secondary={item.secondary}
                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500, color: '#1d1917' }}
                    secondaryTypographyProps={{ variant: 'body2', color: '#8f8f8f' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#1d1917' }}>
            Who Can Apply?
          </Typography>
          <Typography variant="body1" color="#1d1917" paragraph>
            We're currently accepting mentors in:
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {[
              [<MusicNote />, 'Music', 'artists, producers, engineers'],
              [<Movie />, 'Film/TV', 'actors, directors, editors'],
              [<Brush />, 'Visual Arts', 'designers, illustrators, animators'],
              [<TheaterComedy />, 'Performing Arts', 'dancers, spoken word, theater'],
              [<CameraAlt />, 'Content Creation', 'YouTubers, influencers, editors']
            ].map(([icon, title, desc], i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.03)',
                  }}
                >
                  <Box sx={{ mb: 1 }}>{icon}</Box>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#1d1917' }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="#8f8f8f">
                    {desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography variant="body1" sx={{ mt: 4, fontStyle: 'italic', color: '#1d1917' }}>
            If you have experience, credibility, and passion to teach, we want you.
          </Typography>
        </Box>

        <Divider sx={{ my: 6 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#1d1917' }}>
            Ready to Join?
          </Typography>
          <Typography variant="body1" color="#1d1917">
            Email us at
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            <Link
              href="mailto:team@igotnextmagazine.com"
              sx={{
                textDecoration: 'underline',
                color: '#f2c85b',
                fontWeight: 600,
              }}
            >
              team@igotnextmagazine.com
            </Link>
          </Typography>

          <Typography variant="body1" color="#1d1917" paragraph>
            Include:
          </Typography>
          <List sx={{ maxWidth: 600, mx: 'auto' }}>
            {["Your name and industry", "A short bio or resume", "Links to your work (portfolio, IMDb, Spotify, etc.)", "Why you want to mentor"].map((item, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText primary={item} primaryTypographyProps={{ variant: 'body1', color: '#1d1917' }} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 4, fontWeight: 600, color: '#fd2f30' }}>
            Let's build something meaningful together.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BecomeAMentor;
