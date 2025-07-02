import React from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Breadcrumbs,
    Link,
} from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const NewsPress: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Breadcrumbs 
                separator={<NavigateNext fontSize="small" />}
                sx={{ mb: 3 }}
            >
                <Link component={RouterLink} to="/" color="inherit" underline="hover">
                    Home
                </Link>
                <Typography color="text.primary">News & Press Releases</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 6, mb: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}>
                        📰 News & Press Releases
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                        Stay tuned for the latest updates, announcements, and press releases from I Got Next Magazine.
                    </Typography>
                    
                    <Box sx={{ 
                        p: 4, 
                        border: '2px dashed #e0e0e0', 
                        borderRadius: 2, 
                        backgroundColor: '#fafafa',
                        maxWidth: 400,
                        mx: 'auto'
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                            Coming Soon
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            We're working hard to bring you the latest news and press releases. Check back soon for updates!
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default NewsPress; 