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
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Breadcrumbs 
                separator={<NavigateNext fontSize="small" />}
                sx={{ mb: 3 }}
            >
                <Link component={RouterLink} to="/" color="inherit" underline="hover">
                    Home
                </Link>
                <Typography color="text.primary">Advertise With Us</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
                        📢 Advertise With Us
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        Connect with our engaged community of music and entertainment professionals, artists, and industry leaders.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                            Why Advertise With I Got Next?
                        </Typography>
                        <List>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <People color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Targeted Audience"
                                    secondary="Reach music and entertainment professionals, artists, and industry leaders"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <TrendingUp color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Growing Platform"
                                    secondary="Join our rapidly expanding community of creative professionals"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Visibility color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="High Visibility"
                                    secondary="Premium placement opportunities across our platform"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Quality Content"
                                    secondary="Your brand alongside curated, high-quality content"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                        </List>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                            Advertising Opportunities
                        </Typography>
                        <List>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Banner Advertising"
                                    secondary="Premium banner placements across our website"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Sponsored Content"
                                    secondary="Native advertising and sponsored articles"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Newsletter Sponsorship"
                                    secondary="Reach our subscribers through email campaigns"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Event Sponsorship"
                                    secondary="Sponsor our events and mentorship programs"
                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 6, p: 4, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                        Ready to Get Started?
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Contact our advertising team to discuss opportunities and get a custom quote for your campaign.
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        📧{' '}
                        <Link 
                            href="mailto:advertise@igotnextmagazine.com" 
                            color="primary"
                            sx={{ textDecoration: 'underline', fontWeight: 600 }}
                        >
                            advertise@igotnextmagazine.com
                        </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        We'll get back to you within 24 hours with detailed information about our advertising packages.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdvertiseWithUs; 