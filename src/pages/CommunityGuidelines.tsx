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

const CommunityGuidelines: React.FC = () => {
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
                <Typography color="text.primary">Community Guidelines</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Community Guidelines
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Last updated: {currentDate}
                </Typography>

                <Typography variant="body1" paragraph>
                    Welcome to I Got Next. Our mission is to create a safe, respectful, and inspiring space where mentees and mentors can connect and grow. These Community Guidelines outline the behavior we expect from all users. Violating them may result in warnings, suspension, or account removal.
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        1. Respect Others
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Treat everyone with kindness and professionalism.
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            No harassment, hate speech, bullying, or personal attacks.
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Disagreements are okay — disrespect is not.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        2. Stay Professional
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Mentorship is a space for growth. Keep all interactions focused on learning and development.
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Mentors and mentees must not engage in inappropriate, suggestive, or romantic behavior on the platform.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        3. Protect Privacy
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Do not share anyone else's private information (e.g., contact details, personal stories) without permission.
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Respect the confidentiality of sessions and chats.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        4. Keep It Legal
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Do not use I Got Next to promote or engage in illegal activities.
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Upload only content you own or have permission to share.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        5. No Spam or Self-Promotion
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Do not send promotional messages or ads to other users without consent.
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Use the platform for genuine mentorship and connection — not solicitation.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        6. Be Reliable
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            If you book a session, show up on time and be prepared.
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Mentors: keep your schedule updated and honor your commitments.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        7. Use Chat Respectfully
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <Typography component="li" variant="body1" paragraph>
                            Our internal chat is a tool for coordination and support — not for abuse or off-topic discussions.
                        </Typography>
                        <Typography component="li" variant="body1" paragraph>
                            Messages are not encrypted. Please use appropriate discretion.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        8. Report Issues
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you see something that violates these guidelines or feels unsafe, email us at{' '}
                        <Link href="mailto:admin@igotnextmagazine.com" color="primary">
                            admin@igotnextmagazine.com
                        </Link>
                        . We take reports seriously and will review every case.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        9. Enforcement
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We reserve the right to take action if these guidelines are violated, including warnings, content removal, or account suspension/termination.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        10. Updates
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We may update these guidelines to reflect new features or changes in community needs. The most recent version will always be available on our website.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                        💬 Final Note
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We're building this community together. By using I Got Next, you agree to uphold these standards and help us create a safe, empowering space for all.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default CommunityGuidelines; 