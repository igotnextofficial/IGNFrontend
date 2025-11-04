import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Box, CircularProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { APP_ENDPOINTS } from '../../../config/app';
import useHttp from '../../../customhooks/useHttp';
import { MentorDataType, SessionDataType } from '../../../types/DataTypes';

interface MentorWithMetrics extends MentorDataType {
    average_rating?: number | null;
    last_login_at?: string;
    last_activity_at?: string;
}

const formatDate = (value?: string): string => {
    if (!value) return 'Not available';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return value;
    }
    return parsed.toLocaleDateString();
};

const computeSessionsCompleted = (mentor: MentorDataType): number => {
    if (!Array.isArray(mentor.bookings)) return 0;
    return mentor.bookings.reduce((total, booking) => {
        if (!Array.isArray(booking.sessions)) return total;
        const completed = booking.sessions.filter((session: SessionDataType) => session.status === 'completed').length;
        return total + completed;
    }, 0);
};

const computeAverageRating = (mentor: MentorWithMetrics): string => {
    const scoredFeedback = (mentor as Record<string, unknown>).feedback as Array<{ rating?: number }> | undefined;
    if (typeof mentor.average_rating === 'number') {
        return mentor.average_rating.toFixed(1);
    }
    if (Array.isArray(scoredFeedback) && scoredFeedback.length > 0) {
        const validRatings = scoredFeedback.map((item) => item.rating).filter((rating): rating is number => !!rating);
        if (validRatings.length > 0) {
            const sum = validRatings.reduce((total, rating) => total + rating, 0);
            return (sum / validRatings.length).toFixed(1);
        }
    }
    return 'No feedback';
};

const MentorPerformancePanel = () => {
    const { get } = useHttp();
    const [mentors, setMentors] = useState<MentorWithMetrics[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMentors = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await get(APP_ENDPOINTS.USER.MENTOR.BASE);
                const collection =
                    (Array.isArray(data?.data) ? data.data : undefined) ??
                    (Array.isArray(data?.mentors) ? data.mentors : undefined) ??
                    (Array.isArray(data) ? data : []);
                setMentors(collection as MentorWithMetrics[]);
            } catch (err) {
                console.error('Failed to load mentor metrics', err);
                setError('Unable to load mentor performance metrics. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadMentors();
    }, [get]);

    const mentorsWithMetrics = useMemo(
        (): Array<MentorWithMetrics & { sessionsCompleted: number; displayRating: string; lastLoginLabel: string }> => {
        return mentors.map((mentor) => {
            const sessionsCompleted = computeSessionsCompleted(mentor);
            const averageRating = computeAverageRating(mentor);
            const lastLogin =
                mentor.last_activity_at ??
                mentor.last_login_at ??
                (mentor as Record<string, unknown>).updated_at ??
                (mentor as Record<string, unknown>).created_at;

            return {
                ...mentor,
                sessionsCompleted,
                displayRating: averageRating,
                lastLoginLabel: formatDate(typeof lastLogin === 'string' ? lastLogin : undefined)
            };
        });
    },
        [mentors]
    );

    return (
        <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}

            {loading ? (
                <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ py: 3 }}>
                    <CircularProgress size={22} />
                    <Typography variant="body2" color="text.secondary">
                        Loading mentor metrics...
                    </Typography>
                </Stack>
            ) : mentorsWithMetrics.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    No mentor records available yet.
                </Typography>
            ) : (
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, borderColor: 'divider' }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Mentor</TableCell>
                                <TableCell align="center">Sessions completed</TableCell>
                                <TableCell align="center">Average rating</TableCell>
                                <TableCell align="center">Last active</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mentorsWithMetrics.map((mentor) => (
                                <TableRow key={mentor.id} hover>
                                    <TableCell>
                                        <Typography variant="subtitle2">{mentor.fullname}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {(mentor as Record<string, unknown>).email ?? 'No email'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">{mentor.sessionsCompleted}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">{mentor.displayRating}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">{mentor.lastLoginLabel}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Stack>
    );
};

export default MentorPerformancePanel;
