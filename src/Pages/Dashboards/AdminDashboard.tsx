import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../../types/Roles';
import RequestArticle from '../../components/users/admin/RequestArticle';
import UserDirectoryPanel from '../../components/users/admin/UserDirectoryPanel';
import MentorInviteManager from '../../components/users/admin/MentorInviteManager';
import MentorApplicationsPanel from '../../components/users/admin/MentorApplicationsPanel';
import MentorPerformancePanel from '../../components/users/admin/MentorPerformancePanel';
import AdminDashboardSection from '../../components/users/admin/AdminDashboardSection';
import AdminMetricsOverview from '../../components/users/admin/AdminMetricsOverview';

const AdminDashboard = () => {
    const { user, loadingUser } = useUser();
    const [fullname, setFullname] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (loadingUser) {
            return;
        }

        if (!user || user.role?.type !== Roles.ADMIN) {
            navigate('/');
            return;
        }

        setFullname(user.fullname ?? '');
    }, [user?.id, user?.fullname, user?.role?.type, loadingUser, navigate]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={3}>
                <Stack spacing={0.5}>
                    <Typography variant="h4" fontWeight={700}>
                        Welcome back, {fullname || 'admin'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage mentors, users, and editorial insights from a single place.
                    </Typography>
                </Stack>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <AdminDashboardSection
                            title="Platform snapshot"
                            description="At a glance metrics across the mentorship ecosystem."
                        >
                            <AdminMetricsOverview />
                        </AdminDashboardSection>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={3}>
                            <AdminDashboardSection
                                title="User directory"
                                description="Search and filter the community to find accounts that need attention."
                            >
                                <UserDirectoryPanel />
                            </AdminDashboardSection>

                            <AdminDashboardSection
                                title="Mentor invites"
                                description="Send new invites or follow up on pending mentor onboarding."
                            >
                                <MentorInviteManager />
                            </AdminDashboardSection>

                            <AdminDashboardSection
                                title="Content suggestions"
                                description="Request fresh story ideas tailored to your coverage priorities."
                            >
                                <RequestArticle />
                            </AdminDashboardSection>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={3}>
                            <AdminDashboardSection
                                title="Mentor applications"
                                description="Approve qualified mentors or share feedback before they join the roster."
                            >
                                <MentorApplicationsPanel />
                            </AdminDashboardSection>

                            <AdminDashboardSection
                                title="Mentor performance"
                                description="Track mentor engagement, feedback, and recent activity."
                            >
                                <MentorPerformancePanel />
                            </AdminDashboardSection>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};

export default AdminDashboard;
