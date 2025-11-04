import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Chip, CircularProgress, IconButton, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { APP_ENDPOINTS } from '../../../config/app';
import useHttp from '../../../customhooks/useHttp';

type InviteStatus = 'sent' | 'accepted' | 'expired' | 'revoked' | 'pending';

interface MentorInvite {
    id: string;
    email: string;
    status: InviteStatus;
    sent_at?: string;
    resent_at?: string;
    expires_at?: string;
}

const buttonSx = {
    textTransform: 'none',
    borderRadius: 2,
    px: 2.5,
    py: 1
};

const actionButtonSx = {
    textTransform: 'none',
    borderRadius: 2,
    px: 1.5,
    py: 0.75,
    minWidth: 0
};

const formatDateTime = (value?: string) => {
    if (!value) return 'Not available';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return value;
    }
    return parsed.toLocaleString();
};

const MentorInviteManager = () => {
    const { get, post, del } = useHttp();
    const [invites, setInvites] = useState<MentorInvite[]>([]);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const fetchInvites = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await get(APP_ENDPOINTS.USER.MENTOR.INVITE, { requiresAuth: true });
            const list =
                (Array.isArray(data?.data) ? data.data : undefined) ??
                (Array.isArray(data?.invites) ? data.invites : undefined) ??
                (Array.isArray(data) ? data : []);
            setInvites(list as MentorInvite[]);
        } catch (err) {
            console.error('Failed to load mentor invites', err);
            setError('Unable to load mentor invites. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSendInvite = async () => {
        if (!email.trim()) {
            setError('Please provide an email before sending an invite.');
            return;
        }
        setSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        try {
            await post(APP_ENDPOINTS.USER.MENTOR.INVITE, { email: email.trim() });
            setSuccessMessage('Invite sent successfully.');
            setEmail('');
            await fetchInvites();
        } catch (err) {
            console.error('Failed to send mentor invite', err);
            setError('Unable to send invite right now. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleResendInvite = async (invite: MentorInvite) => {
        setSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        try {
            await post(APP_ENDPOINTS.USER.MENTOR.INVITE, { email: invite.email, resend: true });
            setSuccessMessage('Invite resent successfully.');
            await fetchInvites();
        } catch (err) {
            console.error('Failed to resend mentor invite', err);
            setError('Unable to resend invite right now. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRevokeInvite = async (invite: MentorInvite) => {
        setSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        try {
            await del(`${APP_ENDPOINTS.USER.MENTOR.INVITE}/${invite.id}`);
            setSuccessMessage('Invite revoked.');
            await fetchInvites();
        } catch (err) {
            console.error('Failed to revoke mentor invite', err);
            setError('Unable to revoke invite right now. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Stack spacing={3}>
            <Box display="flex" justifyContent="flex-end">
                <Tooltip title="Refresh invites">
                    <span>
                        <IconButton onClick={fetchInvites} disabled={loading || submitting} size="small">
                            <RefreshIcon fontSize="small" />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>

            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
                <TextField
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    label="Mentor email"
                    placeholder="mentor@example.com"
                    fullWidth
                    size="small"
                />
                <Button
                    onClick={handleSendInvite}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    disabled={submitting}
                    sx={buttonSx}
                >
                    {submitting ? 'Sending...' : 'Send invite'}
                </Button>
            </Stack>

            {loading ? (
                <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ py: 3 }}>
                    <CircularProgress size={22} />
                    <Typography variant="body2" color="text.secondary">
                        Loading invites...
                    </Typography>
                </Stack>
            ) : invites.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    No invites yet. Send a new invite to get started.
                </Typography>
            ) : (
                <Stack spacing={1.5}>
                    {invites.map((invite) => (
                        <Paper
                            key={invite.id}
                            variant="outlined"
                            sx={{ p: 2, borderRadius: 2, borderColor: 'divider' }}
                        >
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems="center">
                                <Box flex={1} width="100%">
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {invite.email}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                                        <Chip
                                            label={invite.status}
                                            size="small"
                                            color={
                                                invite.status === 'accepted'
                                                    ? 'success'
                                                    : invite.status === 'expired'
                                                    ? 'default'
                                                    : invite.status === 'revoked'
                                                    ? 'secondary'
                                                    : 'warning'
                                            }
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            Sent {formatDateTime(invite.sent_at)}
                                        </Typography>
                                    </Stack>
                                    {invite.expires_at && (
                                        <Typography variant="caption" color="text.secondary">
                                            Expires {formatDateTime(invite.expires_at)}
                                        </Typography>
                                    )}
                                </Box>
                                <Stack direction="row" spacing={1}>
                                    <Tooltip title="Resend invite">
                                        <span>
                                            <Button
                                                onClick={() => handleResendInvite(invite)}
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                startIcon={<ReplayIcon fontSize="small" />}
                                                disabled={submitting}
                                                sx={actionButtonSx}
                                            >
                                                Resend
                                            </Button>
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="Revoke invite">
                                        <span>
                                            <Button
                                                onClick={() => handleRevokeInvite(invite)}
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                startIcon={<DeleteOutlineIcon fontSize="small" />}
                                                disabled={submitting}
                                                sx={actionButtonSx}
                                            >
                                                Revoke
                                            </Button>
                                        </span>
                                    </Tooltip>
                                </Stack>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Stack>
    );
};

export default MentorInviteManager;
