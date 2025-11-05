import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Chip, CircularProgress, Grid, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { Roles } from '../../../types/Roles';
import { APP_ENDPOINTS } from '../../../config/app';
import useHttp from '../../../customhooks/useHttp';
import { UserDataType } from '../../../types/DataTypes';

type ActivityFilter = 'all' | 'active_7' | 'dormant_30';
type StatusFilter = 'all' | 'active' | 'pending' | 'inactive' | 'unknown';
type RoleFilter =
    | 'all'
    | Roles.ADMIN
    | Roles.MANAGER
    | Roles.MENTOR
    | Roles.MENTEE
    | Roles.WRITER
    | Roles.ARTIST
    | Roles.SUBSCRIBER;

const roleOptions: { label: string; value: RoleFilter }[] = [
    { label: 'All roles', value: 'all' },
    { label: 'Admin', value: Roles.ADMIN },
    { label: 'Manager', value: Roles.MANAGER },
    { label: 'Mentor', value: Roles.MENTOR },
    { label: 'Mentee', value: Roles.MENTEE },
    { label: 'Writer', value: Roles.WRITER },
    { label: 'Artist', value: Roles.ARTIST },
    { label: 'Subscriber', value: Roles.SUBSCRIBER }
];

const statusOptions: { label: string; value: StatusFilter }[] = [
    { label: 'All statuses', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Unknown', value: 'unknown' }
];

const activityOptions: { label: string; value: ActivityFilter }[] = [
    { label: 'Any activity', value: 'all' },
    { label: 'Active in last 7 days', value: 'active_7' },
    { label: 'Dormant (30+ days)', value: 'dormant_30' }
];

interface NormalizedUser extends UserDataType {
    email?: string;
    status?: string;
    last_login_at?: string;
    last_activity_at?: string;
    is_active?: boolean;
}

const getUserStatus = (user: NormalizedUser): StatusFilter => {
    const statusValue =
        user.status ??
        (typeof user.is_active === 'boolean' ? (user.is_active ? 'active' : 'inactive') : undefined) ??
        user.role?.type;

    if (!statusValue) {
        return 'unknown';
    }

    const normalized = statusValue.toString().toLowerCase();
    if (normalized.includes('pending')) return 'pending';
    if (normalized.includes('active')) return 'active';
    if (normalized.includes('inactive') || normalized.includes('disabled')) return 'inactive';

    return 'unknown';
};

const parseDate = (value?: string): Date | null => {
    if (!value) return null;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getLastActivityDate = (user: NormalizedUser): Date | null => {
    return (
        parseDate(user.last_activity_at) ??
        parseDate((user as Record<string, unknown>).last_active_at as string | undefined) ??
        parseDate(user.last_login_at) ??
        parseDate((user as Record<string, unknown>).updated_at as string | undefined) ??
        parseDate((user as Record<string, unknown>).created_at as string | undefined)
    );
};

const daysBetweenNow = (date: Date | null): number | null => {
    if (!date) return null;
    const difference = Date.now() - date.getTime();
    return Math.floor(difference / (1000 * 60 * 60 * 24));
};

const matchesActivityFilter = (filter: ActivityFilter, lastActivityDate: Date | null): boolean => {
    if (filter === 'all') return true;
    const days = daysBetweenNow(lastActivityDate);
    if (days === null) return filter === 'dormant_30';
    if (filter === 'active_7') {
        return days <= 7;
    }
    if (filter === 'dormant_30') {
        return days >= 30;
    }
    return true;
};

const formatRelativeDate = (date: Date | null): string => {
    if (!date) return 'No activity recorded';
    const days = daysBetweenNow(date);
    if (days === 0) return 'Active today';
    if (days === 1) return 'Active yesterday';
    if (days && days < 7) return `Active ${days} days ago`;
    if (days && days <= 30) return `Active ${Math.floor(days / 7)} week(s) ago`;
    if (days) return `Inactive ${days} days`;
    return 'No activity recorded';
};

const UserDirectoryPanel = () => {
    const { get } = useHttp();
    const [users, setUsers] = useState<NormalizedUser[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await get(APP_ENDPOINTS.USER.ALL);
                const extracted =
                    (Array.isArray(data?.data) ? data?.data : undefined) ??
                    (Array.isArray(data?.users) ? data?.users : undefined) ??
                    (Array.isArray(data) ? data : []) ??
                    [];
                setUsers(extracted as NormalizedUser[]);
            } catch (err) {
                console.error('Failed to load users', err);
                setError('Unable to load users right now. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [get]);

    const filteredUsers = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return users.filter((user) => {
            const roleType = user.role?.type.toLocaleLowerCase() ?? (user.role as unknown as string) ?? '';
            const status = getUserStatus(user);
            const lastActivity = getLastActivityDate(user);

            const matchesSearch =
                !normalizedSearch ||
                user.fullname?.toLowerCase().includes(normalizedSearch) ||
                (user.username?.toLowerCase().includes(normalizedSearch) ?? false) ||
                (user.email?.toLowerCase().includes(normalizedSearch) ?? false);

            const matchesRole = roleFilter === 'all' || roleType === roleFilter.toLowerCase();
            const matchesStatus = statusFilter === 'all' || status === statusFilter;
            const matchesActivity = matchesActivityFilter(activityFilter, lastActivity);

            return matchesSearch && matchesRole && matchesStatus && matchesActivity;
        });
    }, [users, searchTerm, roleFilter, statusFilter, activityFilter]);

    return (
        <Stack spacing={3}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        label="Search"
                        placeholder="Name or email"
                        fullWidth
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        select
                        value={roleFilter}
                        onChange={(event) => setRoleFilter(event.target.value as RoleFilter)}
                        label="Role"
                        fullWidth
                        size="small"
                    >
                        {roleOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                        label="Status"
                        fullWidth
                        size="small"
                    >
                        {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        select
                        value={activityFilter}
                        onChange={(event) => setActivityFilter(event.target.value as ActivityFilter)}
                        label="Activity"
                        fullWidth
                        size="small"
                    >
                        {activityOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            {loading && (
                <Stack direction="row" alignItems="center" spacing={2} justifyContent="center" sx={{ py: 4 }}>
                    <CircularProgress size={24} />
                    <Typography variant="body2" color="text.secondary">
                        Loading users...
                    </Typography>
                </Stack>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && (
                <Box sx={{ maxHeight: 360, overflowY: 'auto', pr: 1 }}>
                    {filteredUsers.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                            No users match the selected filters.
                        </Typography>
                    ) : (
                        <Stack spacing={1.5}>
                            {filteredUsers.map((user) => {
                                const roleType = user.role?.type ?? 'unknown';
                                const status = getUserStatus(user);
                                const activityDate = getLastActivityDate(user);

                                return (
                                    <Paper
                                        key={user.id}
                                        variant="outlined"
                                        sx={{ p: 2, borderRadius: 2, borderColor: 'divider' }}
                                    >
                                        <Grid container spacing={1.5} alignItems="center">
                                            <Grid item xs={12} md={4}>
                                                <Typography variant="subtitle1" fontWeight={600}>
                                                    {user.fullname}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {user.email ?? 'No email provided'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={2}>
                                                <Chip label={roleType} size="small" color="primary" />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={2}>
                                                <Chip
                                                    label={status}
                                                    size="small"
                                                    color={
                                                        status === 'active'
                                                            ? 'success'
                                                            : status === 'pending'
                                                            ? 'warning'
                                                            : status === 'inactive'
                                                            ? 'default'
                                                            : 'info'
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {formatRelativeDate(activityDate)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                );
                            })}
                        </Stack>
                    )}
                </Box>
            )}
        </Stack>
    );
};

export default UserDirectoryPanel;
