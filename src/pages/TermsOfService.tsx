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

const TermsOfService: React.FC = () => {
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
                <Typography color="text.primary">Terms of Service</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Terms of Service
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Last updated: {currentDate}
                </Typography>

                <Typography variant="body1" paragraph>
                    Welcome to I Got Next, operated by Uvision LLC ("we," "our," or "us").
                </Typography>

                <Typography variant="body1" paragraph>
                    By using our platform, you agree to these Terms of Service ("Terms"). Please read them carefully.
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        1. Eligibility
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You must be at least 18 years old to use I Got Next. By creating an account, you confirm that you meet this age requirement.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        2. Your Account
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You are responsible for maintaining the security of your account. Do not share your login credentials with others. You are also responsible for any activity that occurs under your account.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        3. Mentorship Services
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Mentees may book sessions with mentors through the platform. Mentors are responsible for updating their availability and honoring scheduled sessions. We do not guarantee the outcome of any mentorship relationship.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        4. Payments
                    </Typography>
                    <Typography variant="body1" paragraph>
                        All payments are processed securely via Stripe. We do not store or directly process credit card data. Refunds or disputes are subject to our refund policy and Stripe's terms of service.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        5. User Content
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You may upload images or content to your profile. By doing so, you grant us a limited license to use, display, and share your content on the platform. You are responsible for ensuring your content is lawful and does not infringe on others' rights.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        6. Prohibited Conduct
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You agree not to:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Violate any laws or regulations
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Use the platform for harassment or abuse
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Upload illegal, offensive, or copyrighted materials without permission
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        7. Termination
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We reserve the right to suspend or delete accounts that violate these Terms or disrupt the platform.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        8. Disclaimers
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We provide the platform "as is" without warranties. We are not responsible for the quality, accuracy, or legality of any mentorship services.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        9. Limitation of Liability
                    </Typography>
                    <Typography variant="body1" paragraph>
                        To the fullest extent allowed by law, Uvision LLC is not liable for any damages arising from your use of the platform.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        10. Governing Law
                    </Typography>
                    <Typography variant="body1" paragraph>
                        These Terms are governed by the laws of the State of California, USA.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        11. Contact
                    </Typography>
                    <Typography variant="body1" paragraph>
                        For questions, email us at:{' '}
                        <Link href="mailto:admin@igotnextmagazine.com" color="primary">
                            admin@igotnextmagazine.com
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default TermsOfService; 