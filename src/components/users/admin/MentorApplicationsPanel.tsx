import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Chip, CircularProgress, Paper, Stack, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { APP_ENDPOINTS } from '../../../config/app';
import useHttp from '../../../customhooks/useHttp';
import { MentorDataType } from '../../../types/DataTypes';

type MentorApplication = MentorDataType & {
    application_id?: string;
    submitted_at?: string;
    application_status?: string;
};

const actionButtonSx = {
    textTransform: 'none',
    borderRadius: 2,
    px: 2,
    py: 0.75,
    minWidth: 0
};

const MentorApplicationsPanel = () => {
    const { get, post } = useHttp();
    const [applications, setApplications] = useState<MentorApplication[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [rejectingId, setRejectingId] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [busyId, setBusyId] = useState<string | null>(null);

    const loadApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await get(`${APP_ENDPOINTS.USER.MENTOR.BASE}?status=pending`);
            const list =
                (Array.isArray(data?.data) ? data.data : undefined) ??
                (Array.isArray(data?.applications) ? data.applications : undefined) ??
                (Array.isArray(data) ? data : []);
            const pending = (list as MentorApplication[]).filter((mentor) => {
                const status =
                    mentor.application_status ??
                    mentor.status ??
                    (mentor.role && 'status' in mentor.role ? (mentor.role as Record<string, unknown>).status : null);
                return (status?.toString().toLowerCase() ?? 'pending') === 'pending';
            });
            setApplications(pending);
        } catch (err) {
            console.error('Failed to load mentor applications', err);
            setError('Unable to load mentor applications at the moment.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApplications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleApprove = async (application: MentorApplication) => {
        setBusyId(application.id);
        setError(null);
        setSuccessMessage(null);
        try {
            const url = `${APP_ENDPOINTS.USER.MENTOR.BASE}/${application.id}/approve`;
            await post(url, {});
            setSuccessMessage('Application approved.');
            await loadApplications();
        } catch (err) {
            console.error('Failed to approve mentor application', err);
            setError('Unable to approve application. Please try again.');
        } finally {
            setBusyId(null);
        }
    };

    const handleReject = async (application: MentorApplication) => {
        if (!rejectReason.trim()) {
            setError('Please provide a reason before rejecting an application.');
            return;
        }
        setBusyId(application.id);
        setError(null);
        setSuccessMessage(null);
        try {
            const url = `${APP_ENDPOINTS.USER.MENTOR.BASE}/${application.id}/reject`;
            await post(url, { reason: rejectReason });
            setSuccessMessage('Application rejected.');
            setRejectingId(null);
            setRejectReason('');
            await loadApplications();
        } catch (err) {
            console.error('Failed to reject mentor application', err);
            setError('Unable to reject application. Please try again.');
        } finally {
            setBusyId(null);
        }
    };

    return (
        <Stack spacing={3}>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            {loading ? (
                <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ py: 3 }}>
                    <CircularProgress size={22} />
                    <Typography variant="body2" color="text.secondary">
                        Loading applications...
                    </Typography>
                </Stack>
            ) : applications.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    No pending applications right now.
                </Typography>
            ) : (
                <Stack spacing={1.5}>
                    {applications.map((application) => (
                        <Paper
                            key={application.id}
                            variant="outlined"
                            sx={{ p: 2, borderRadius: 2, borderColor: 'divider' }}
                        >
                            <Stack spacing={1.5}>
                                <Stack
                                    direction={{ xs: 'column', md: 'row' }}
                                    spacing={1}
                                    alignItems={{ xs: 'flex-start', md: 'center' }}
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {application.fullname}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {application.email ?? 'No email provided'}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Chip label="Pending review" color="warning" size="small" />
                                        {application.submitted_at && (
                                            <Typography variant="caption" color="text.secondary">
                                                Submitted {new Date(application.submitted_at).toLocaleDateString()}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Stack>

                                <Stack direction="row" spacing={1}>
                                    <Button
                                        onClick={() => handleApprove(application)}
                                        variant="contained"
                                        color="success"
                                        startIcon={<CheckIcon fontSize="small" />}
                                        size="small"
                                        disabled={busyId === application.id}
                                        sx={actionButtonSx}
                                    >
                                        Approve
                                    </Button>
                                    {rejectingId === application.id ? (
                                        <>
                                            <Button
                                                onClick={() => setRejectingId(null)}
                                                variant="text"
                                                color="inherit"
                                                size="small"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() => handleReject(application)}
                                                variant="outlined"
                                                color="error"
                                                startIcon={<CloseIcon fontSize="small" />}
                                                size="small"
                                                disabled={busyId === application.id}
                                                sx={actionButtonSx}
                                            >
                                                Confirm reject
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={() => {
                                                setRejectingId(application.id);
                                                setRejectReason('');
                                            }}
                                            variant="outlined"
                                            color="error"
                                            startIcon={<CloseIcon fontSize="small" />}
                                            size="small"
                                            disabled={busyId === application.id}
                                            sx={actionButtonSx}
                                        >
                                            Reject
                                        </Button>
                                    )}
                                </Stack>

                                {rejectingId === application.id && (
                                    <TextField
                                        value={rejectReason}
                                        onChange={(event) => setRejectReason(event.target.value)}
                                        label="Rejection reason"
                                        placeholder="Share brief context for the applicant"
                                        multiline
                                        minRows={2}
                                        fullWidth
                                        size="small"
                                    />
                                )}
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Stack>
    );
};

export default MentorApplicationsPanel;
