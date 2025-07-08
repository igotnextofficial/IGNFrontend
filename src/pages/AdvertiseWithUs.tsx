import React from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Breadcrumbs,
    Link,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { NavigateNext, CheckCircle, TrendingUp, People, Visibility } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const AdvertiseWithUs: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Breadcrumbs 
                separator={<NavigateNext fontSize="small" />}
                sx={{ mb: 3 }}
            >
                <Link component={RouterLink} to="/" color="inherit" underline="hover">
                    Home
                </Link>
                <Typography color="#1d1917">Advertise With Us</Typography>
            </Breadcrumbs>

            <Paper elevation={0} sx={{ backgroundColor: '#FBFAF9', p: 6, borderRadius: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1d1917' }}>
                        Advertise With Us
                    </Typography>
                    <Typography variant="h6" color="#8f8f8f" sx={{ maxWidth: 800, mx: 'auto' }}>
                        Connect with our engaged community of music and entertainment professionals, artists, and industry leaders.
                    </Typography>
                </Box>

                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1d1917', mb: 3 }}>
                            Why Advertise With I Got Next?
                        </Typography>
                        <List>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <People sx={{ color: '#f2c85b' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Targeted Audience"
                                    secondary="Reach music and entertainment professionals, artists, and industry leaders"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500, color: '#1d1917' }}
                                    secondaryTypographyProps={{ variant: 'body2', color: '#8f8f8f' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <TrendingUp sx={{ color: '#f2c85b' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Growing Platform"
                                    secondary="Join our rapidly expanding community of creative professionals"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500, color: '#1d1917' }}
                                    secondaryTypographyProps={{ variant: 'body2', color: '#8f8f8f' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Visibility sx={{ color: '#f2c85b' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="High Visibility"
                                    secondary="Premium placement opportunities across our platform"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500, color: '#1d1917' }}
                                    secondaryTypographyProps={{ variant: 'body2', color: '#8f8f8f' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle sx={{ color: '#f2c85b' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Quality Content"
                                    secondary="Your brand alongside curated, high-quality content"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500, color: '#1d1917' }}
                                    secondaryTypographyProps={{ variant: 'body2', color: '#8f8f8f' }}
                                />
                            </ListItem>
                        </List>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1d1917', mb: 3 }}>
                            Advertising Opportunities
                        </Typography>
                        <List>
                            {["Banner Advertising", "Sponsored Content", "Newsletter Sponsorship", "Event Sponsorship"].map((text, index) => (
                                <ListItem key={index} sx={{ px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        <CheckCircle sx={{ color: '#f2c85b' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={text}
                                        secondary={
                                            index === 0 ? "Premium banner placements across our website" :
                                            index === 1 ? "Native advertising and sponsored articles" :
                                            index === 2 ? "Reach our subscribers through email campaigns" :
                                            "Sponsor our events and mentorship programs"
                                        }
                                        primaryTypographyProps={{ variant: 'body1', fontWeight: 500, color: '#1d1917' }}
                                        secondaryTypographyProps={{ variant: 'body2', color: '#8f8f8f' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 6, p: 4, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1d1917', mb: 3 }}>
                        Ready to Get Started?
                    </Typography>
                    <Typography variant="body1" paragraph color="#1d1917">
                        Contact our advertising team to discuss opportunities and get a custom quote for your campaign.
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        <Link 
                            href="mailto:advertise@igotnextmagazine.com" 
                            sx={{ textDecoration: 'underline', fontWeight: 600, color: '#f2c85b' }}
                        >
                            advertise@igotnextmagazine.com
                        </Link>
                    </Typography>
                    <Typography variant="body2" color="#8f8f8f">
                        We'll get back to you within 24 hours with detailed information about our advertising packages.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdvertiseWithUs;