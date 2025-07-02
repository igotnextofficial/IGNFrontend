import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Breadcrumbs,
    Link,
    List,
    ListItem,
    ListItemText,
    Pagination,
    CircularProgress,
    Alert,
} from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import useHttp from '../customhooks/useHttp';
import { APP_ENDPOINTS } from '../config/app';

interface Mentor {
    id: string;
    fullname: string;
    role: {
        type: string;
    };
}

interface MentorsResponse {
    data: Mentor[];
    total: number;
    page: number;
    limit: number;
}

const MentorDirectory: React.FC = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { get } = useHttp();

    const mentorsPerPage = 10;

    useEffect(() => {
        fetchMentors();
    }, [page]);

    const fetchMentors = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await get<MentorsResponse>(
                `${APP_ENDPOINTS.USER.MENTORS}?page=${page}&limit=${mentorsPerPage}`
            );
            
            setMentors(response.data.data || []);
            setTotalPages(Math.ceil((response.data.total || 0) / mentorsPerPage));
        } catch (err) {
            setError('Failed to load mentors. Please try again later.');
            console.error('Error fetching mentors:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getDisplayNumber = (index: number) => {
        return (page - 1) * mentorsPerPage + index + 1;
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Breadcrumbs 
                separator={<NavigateNext fontSize="small" />}
                sx={{ mb: 3 }}
            >
                <Link component={RouterLink} to="/" color="inherit" underline="hover">
                    Home
                </Link>
                <Typography color="text.primary">Mentor Directory</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
                        👥 Mentor Directory
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        Discover experienced mentors in music, film, fashion, and creative industries.
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                ) : mentors.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No mentors found.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <List sx={{ maxWidth: 600, mx: 'auto' }}>
                            {mentors.map((mentor, index) => (
                                <ListItem 
                                    key={mentor.id}
                                    component={RouterLink}
                                    to={`/profile/${mentor.role.type}/${mentor.id}`}
                                    sx={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 1,
                                        mb: 1,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            borderColor: '#1976d2',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                                {getDisplayNumber(index)}. {mentor.fullname}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="text.secondary">
                                                Click to view profile
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>

                        {totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                    showFirstButton
                                    showLastButton
                                />
                            </Box>
                        )}

                        <Box sx={{ textAlign: 'center', mt: 4, p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                                Want to Become a Mentor?
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Share your expertise and help others grow in their careers.
                            </Typography>
                            <Link 
                                component={RouterLink}
                                to="/become-a-mentor"
                                sx={{ 
                                    textDecoration: 'underline', 
                                    fontWeight: 600,
                                    color: 'primary.main'
                                }}
                            >
                                Apply to Become a Mentor
                            </Link>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default MentorDirectory; 