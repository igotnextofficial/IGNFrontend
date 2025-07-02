import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Breadcrumbs,
    Link,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import { NavigateNext, ExpandMore } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const FAQs: React.FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const faqData = [
        {
            question: "What is I Got Next Magazine?",
            answer: "I Got Next Magazine is a platform that connects music and entertainment professionals with mentorship opportunities. We provide a space for artists, producers, and industry leaders to share knowledge and grow together."
        },
        {
            question: "How do I become a mentee?",
            answer: "To become a mentee, simply register for an account on our platform. Once registered, you can browse available mentors, view their profiles and expertise, and book mentorship sessions directly through our platform."
        },
        {
            question: "How do I become a mentor?",
            answer: "To become a mentor, you need to have professional experience in music, film, fashion, or other creative industries. Contact us at  team@igotnextmagazine.com with your name, industry, bio/resume, links to your work, and why you want to mentor."
        },
        {
            question: "How much do mentorship sessions cost?",
            answer: "Session costs vary by mentor and are set by each individual mentor. You can view pricing information on each mentor's profile before booking a session."
        },
        {
            question: "What happens during a mentorship session?",
            answer: "Mentorship sessions are conducted via Zoom and typically last 30-60 minutes. Sessions can cover topics like career guidance, skill development, industry insights, portfolio reviews, and networking opportunities."
        },
        {
            question: "Can I cancel or reschedule a session?",
            answer: "Yes, you can cancel or reschedule sessions according to each mentor's cancellation policy. Please check the mentor's profile for their specific policy and contact them directly for changes."
        },
        {
            question: "How do I contact support?",
            answer: "For general support, email us at  support@igotnextmagazine.com. For advertising inquiries, contact advertise@igotnextmagazine.com. We typically respond within 24 hours."
        },
        {
            question: "Is my information secure?",
            answer: "Yes, we take data security seriously. We use secure payment processing via Stripe and follow industry best practices to protect your personal information. Please review our Privacy Policy for more details."
        },
        {
            question: "Can I use the platform if I'm under 18?",
            answer: "No, you must be at least 18 years old to use I Got Next. This is a requirement for both mentors and mentees to ensure a professional environment."
        },
        {
            question: "What if I have a dispute with a mentor or mentee?",
            answer: "If you encounter any issues, please contact us at support@igotnextmagazine.com. We take all reports seriously and will work to resolve disputes fairly and promptly."
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Breadcrumbs 
                separator={<NavigateNext fontSize="small" />}
                sx={{ mb: 3 }}
            >
                <Link component={RouterLink} to="/" color="inherit" underline="hover">
                    Home
                </Link>
                <Typography color="text.primary">FAQs</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
                        ❓ Frequently Asked Questions
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        Find answers to common questions about I Got Next Magazine and our mentorship platform.
                    </Typography>
                </Box>

                <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                    {faqData.map((faq, index) => (
                        <Accordion 
                            key={index}
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                            sx={{ 
                                mb: 2,
                                '&:before': {
                                    display: 'none',
                                },
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                sx={{
                                    backgroundColor: expanded === `panel${index}` ? 'primary.main' : 'transparent',
                                    color: expanded === `panel${index}` ? 'white' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: expanded === `panel${index}` ? 'primary.dark' : 'rgba(0,0,0,0.04)',
                                    }
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#fafafa' }}>
                                <Typography variant="body1" color="text.secondary">
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

                <Box sx={{ textAlign: 'center', mt: 6, p: 4, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                        Still Have Questions?
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Can't find what you're looking for? Contact our support team and we'll be happy to help.
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        📧{' '}
                        <Link 
                            href="mailto:support@igotnextmagazine.com" 
                            color="primary"
                            sx={{ textDecoration: 'underline', fontWeight: 600 }}
                        >
                            support@igotnextmagazine.com
                        </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        We typically respond within 24 hours.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default FAQs; 