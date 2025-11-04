import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { APP_ENDPOINTS } from '../../../config/app';
import useHttp from '../../../customhooks/useHttp';

type PrimitiveRecord = Record<string, unknown>;

const extractCollection = (payload: unknown): PrimitiveRecord[] => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload as PrimitiveRecord[];
    if (typeof payload === 'object') {
        const candidate = payload as PrimitiveRecord;
        const keysToCheck = ['data', 'users', 'mentors', 'mentees', 'items', 'results', 'sessions'];
        for (const key of keysToCheck) {
            const value = candidate[key];
            if (Array.isArray(value)) {
                return value as PrimitiveRecord[];
            }
        }
    }
    return [];
};

const computeSessionsByStatus = (sessions: PrimitiveRecord[]) => {
    return sessions.reduce(
        (acc, session) => {
            const status = (session?.status ?? session?.session_status) as string | undefined;
            const normalized = status?.toLowerCase();
            if (normalized === 'completed') {
                acc.completed += 1;
            } else if (normalized === 'pending' || normalized === 'scheduled') {
                acc.pending += 1;
            }
            return acc;
        },
        { completed: 0, pending: 0 }
    );
};

const metricCardStyle = {
    borderRadius: 3,
    p: 3,
    height: '100%',
    background: 'linear-gradient(135deg, #111111 0%, #1f1f1f 100%)',
    color: '#ffffff'
};

const AdminMetricsOverview = () => {
    const { get } = useHttp();
    const [mentorCount, setMentorCount] = useState<number | null>(null);
    const [menteeCount, setMenteeCount] = useState<number | null>(null);
    const [completedSessions, setCompletedSessions] = useState<number | null>(null);
    const [pendingSessions, setPendingSessions] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            setLoading(true);
            setError(null);
            try {
                const [mentorsResponse, menteesResponse, sessionsResponse] = await Promise.all([
                    get(APP_ENDPOINTS.USER.MENTOR.BASE, { requiresAuth: true }),
                    get(APP_ENDPOINTS.USER.MENTEE.BASE, { requiresAuth: true }),
                    get(APP_ENDPOINTS.SESSIONS.BASE, { requiresAuth: true })
                ]);

                const mentorsCollection = extractCollection(mentorsResponse.data);
                const menteesCollection = extractCollection(menteesResponse.data);
                const sessionsCollection = extractCollection(sessionsResponse.data);
                const { completed, pending } = computeSessionsByStatus(sessionsCollection);

                setMentorCount(mentorsCollection.length);
                setMenteeCount(menteesCollection.length);
                setCompletedSessions(completed);
                setPendingSessions(pending);
            } catch (err) {
                console.error('Failed to load dashboard metrics', err);
                setError('We could not load the latest metrics. Please refresh the page or try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, [get]);

    const metrics = [
        {
            label: 'Mentors',
            value: mentorCount,
            caption: 'Active mentor profiles'
        },
        {
            label: 'Mentees',
            value: menteeCount,
            caption: 'Registered mentees'
        },
        {
            label: 'Completed sessions',
            value: completedSessions,
            caption: 'Delivered mentorship sessions'
        },
        {
            label: 'Pending sessions',
            value: pendingSessions,
            caption: 'Upcoming or awaiting confirmation'
        }
    ];

    return (
        <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={2}>
                {metrics.map((metric) => (
                    <Grid item xs={12} sm={4} key={metric.label}>
                        <Paper elevation={0} sx={metricCardStyle}>
                            <Stack spacing={1}>
                                <Typography variant="overline" sx={{ letterSpacing: 1, opacity: 0.7 }}>
                                    {metric.label}
                                </Typography>
                                <Box display="flex" alignItems="baseline" gap={1}>
                                    <Typography variant="h3" fontWeight={700}>
                                        {metric.value !== null
                                            ? metric.value.toLocaleString()
                                            : loading
                                            ? <CircularProgress size={28} color="inherit" />
                                            : '—'}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    {metric.caption}
                                </Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default AdminMetricsOverview;
