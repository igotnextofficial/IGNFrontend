import React from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Divider,
    Link,
    Breadcrumbs,
} from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Breadcrumbs 
                separator={<NavigateNext fontSize="small" />}
                sx={{ mb: 3 }}
            >
                <Link component={RouterLink} to="/" color="inherit" underline="hover">
                    Home
                </Link>
                <Typography color="text.primary">Privacy Policy</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Privacy Policy
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Last updated: {currentDate}
                </Typography>

                <Typography variant="body1" paragraph>
                    Uvision LLC ("we", "us", "our") operates the I Got Next platform. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information.
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        1. Information We Collect
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We collect the following information when you use the platform:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Name and email address
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Profile photo, biography, and uploaded media
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Session scheduling and availability details
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Messages between mentors and mentees
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Payment metadata (handled by Stripe)
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Usage data (via Google Analytics)
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        2. How We Use Your Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We use your data to:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Provide and operate the platform
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Facilitate bookings and communication between mentors and mentees
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Send transactional and promotional emails
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Improve site performance and user experience
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        3. Communication and Marketing
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We may send:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Transactional emails (e.g., booking confirmations, password resets)
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Marketing emails (e.g., newsletters, mentor spotlights)
                        </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                        You can unsubscribe from marketing emails at any time using the link at the bottom of the email.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        4. Third-Party Services
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We use the following third-party services:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Stripe for secure payment processing
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Google Analytics for traffic and usage insights
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Zoom for hosting mentor sessions
                        </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                        These providers may collect data as governed by their respective privacy policies.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        5. Chat and Messaging
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Mentors and mentees can exchange messages through the platform. Please note: messages are not end-to-end encrypted. Do not share sensitive or confidential information in chat.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        6. Account Deletion
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you would like to delete your account, please email us at{' '}
                        <Link href="mailto:admin@igotnextmagazine.com" color="primary">
                            admin@igotnextmagazine.com
                        </Link>
                        . We will remove your data within a reasonable timeframe, subject to our legal and security obligations.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        7. Data Sharing
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We do not sell your personal data. We only share data with trusted service providers as needed to operate the platform or comply with legal obligations.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        8. Children's Privacy
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You must be at least 18 years old to use I Got Next. We do not knowingly collect information from children under 18.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        9. Data Security
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We take reasonable technical and administrative steps to protect your information. However, no system is 100% secure.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        10. Your Rights (California Residents)
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you are a California resident, you have the right to:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Request a copy of the data we hold about you
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Request deletion of your data
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Opt-out of the sale or sharing of your data (we do not currently sell data)
                        </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                        To exercise any of these rights, email{' '}
                        <Link href="mailto:admin@igotnextmagazine.com" color="primary">
                            admin@igotnextmagazine.com
                        </Link>
                        .
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        11. Changes to This Policy
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We may update this Privacy Policy from time to time. We'll notify you by updating the "Last updated" date or via email if changes are significant.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        12. Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you have any questions or requests, contact:
                    </Typography>
                    <Typography variant="body1" paragraph>
                        📧{' '}
                        <Link href="mailto:admin@igotnextmagazine.com" color="primary">
                            admin@igotnextmagazine.com
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default PrivacyPolicy; 