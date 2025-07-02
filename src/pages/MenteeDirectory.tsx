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

interface Mentee {
    id: string;
    fullname: string;
    role: {
        type: string;
    };
}

interface MenteesResponse {
    data: Mentee[];
    total: number;
    page: number;
    limit: number;
}

const MenteeDirectory: React.FC = () => {
    const [mentees, setMentees] = useState<Mentee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { get } = useHttp();

    const menteesPerPage = 10;

    useEffect(() => {
        fetchMentees();
    }, [page]);

    const fetchMentees = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await get<MenteesResponse>(
                `${APP_ENDPOINTS.USER.MENTEE.BASE}?page=${page}&limit=${menteesPerPage}`
            );
            
            setMentees(response.data.data || []);
            setTotalPages(Math.ceil((response.data.total || 0) / menteesPerPage));
        } catch (err) {
            setError('Failed to load mentees. Please try again later.');
            console.error('Error fetching mentees:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getDisplayNumber = (index: number) => {
        return (page - 1) * menteesPerPage + index + 1;
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
                <Typography color="text.primary">Mentee Directory</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
                        🎓 Mentee Directory
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        Connect with aspiring professionals seeking mentorship in creative industries.
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
                ) : mentees.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No mentees found.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <List sx={{ maxWidth: 600, mx: 'auto' }}>
                            {mentees.map((mentee, index) => (
                                <ListItem 
                                    key={mentee.id}
                                    component={RouterLink}
                                    to={`/profile/${mentee.role.type}/${mentee.id}`}
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
                                                {getDisplayNumber(index)}. {mentee.fullname}
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
                                Looking for a Mentor?
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Find the perfect mentor to help you grow in your career.
                            </Typography>
                            <Link 
                                component={RouterLink}
                                to="/mentors/find-a-mentor"
                                sx={{ 
                                    textDecoration: 'underline', 
                                    fontWeight: 600,
                                    color: 'primary.main'
                                }}
                            >
                                Find a Mentor
                            </Link>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default MenteeDirectory; 