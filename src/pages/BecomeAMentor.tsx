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
import { NavigateNext, CheckCircle, Star } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const BecomeAMentor: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Breadcrumbs 
                separator={<NavigateNext fontSize="small" />}
                sx={{ mb: 3 }}
            >
                <Link component={RouterLink} to="/" color="inherit" underline="hover">
                    Home
                </Link>
                <Typography color="text.primary">Become a Mentor</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
                        🌟 Become a Mentor
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        At I Got Next Magazine, we're building a creative ecosystem where mentorship transforms lives. If you're a professional in music, film, fashion, or any creative industry and want to give back — we'd love to have you on board.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                            Why Mentor?
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Mentorship is more than giving advice — it's about empowering the next generation. As a mentor, you'll:
                        </Typography>
                        <List>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemText 
                                    primary="Share your journey and lessons learned"
                                    primaryTypographyProps={{ variant: 'body1' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemText 
                                    primary="Help mentees avoid common pitfalls"
                                    primaryTypographyProps={{ variant: 'body1' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemText 
                                    primary="Guide artists as they grow their craft and brand"
                                    primaryTypographyProps={{ variant: 'body1' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemText 
                                    primary="Build a legacy by shaping future creatives"
                                    primaryTypographyProps={{ variant: 'body1' }}
                                />
                            </ListItem>
                        </List>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                            What's Expected of a Mentor?
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We want our mentors to be committed, engaged, and authentic. Here's what we expect:
                        </Typography>
                        <List>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Minimum of 6 sessions per mentee"
                                    secondary="Help them set meaningful goals and follow through"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Open and update your availability regularly"
                                    secondary="Mentees book based on your schedule"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Professionalism and respect"
                                    secondary="Be a safe, encouraging presence in their journey"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Timely responses"
                                    secondary="Reply to bookings, chats, and session reschedules promptly"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Share insights"
                                    secondary="Offer real stories and actionable feedback"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Promote growth"
                                    secondary="Encourage mentees to challenge themselves"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        Who Can Apply?
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We're currently accepting mentors in:
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    🎤 Music
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    artists, producers, engineers
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    🎬 Film/TV
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    actors, directors, editors
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    🎨 Visual Arts
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    designers, illustrators, animators
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    🎭 Performing Arts
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    dancers, spoken word, theater
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    📸 Content Creation
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    YouTubers, influencers, editors
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" sx={{ mt: 3, fontStyle: 'italic' }}>
                        If you have experience, credibility, and passion to teach, we want you.
                    </Typography>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        Ready to Join?
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Email us at
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        📩{' '}
                        <Link 
                            href="mailto:team@igotnextmagazine.com" 
                            color="primary"
                            sx={{ textDecoration: 'underline', fontWeight: 600 }}
                        >
                             team@igotnextmagazine.com
                        </Link>
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Include:
                    </Typography>
                    <List sx={{ maxWidth: 600, mx: 'auto' }}>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemText 
                                primary="Your name and industry"
                                primaryTypographyProps={{ variant: 'body1' }}
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemText 
                                primary="A short bio or resume"
                                primaryTypographyProps={{ variant: 'body1' }}
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemText 
                                primary="Links to your work (portfolio, IMDb, Spotify, etc.)"
                                primaryTypographyProps={{ variant: 'body1' }}
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemText 
                                primary="Why you want to mentor"
                                primaryTypographyProps={{ variant: 'body1' }}
                            />
                        </ListItem>
                    </List>
                    <Typography variant="h6" sx={{ mt: 4, fontWeight: 600, color: 'primary.main' }}>
                        Let's build something meaningful together. 💫
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default BecomeAMentor; 