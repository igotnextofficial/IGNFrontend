import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Button, Stack } from "@mui/material";
import { MentorDataType, MenteeDataType } from "../../../types/DataTypes";
import CardContentComponent from "../../../helpers/CardContentComponent";
import ListContentComponent from "../../../helpers/ListContentComponent";
import { Switch, FormControlLabel } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import NoDataAvailable from "../../../utils/NoDataAvailable";
import dayjs from "dayjs";
import { useUser } from "../../../contexts/UserContext";
import { useErrorHandler } from "../../../contexts/ErrorContext";
import { APP_ENDPOINTS } from "../../../config/app";

const PendingSessions = ({ user }: { user: MentorDataType }) => {
    const [data, setData] = useState<MenteeDataType[]>([]);
    const [menteeSessions, setMenteeSessions] = useState<MenteeDataType[]>([]);
    const [gridView, setGridView] = useState(true);
    const { user: currentUser,accessToken } = useUser();
    const { updateError } = useErrorHandler();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridView(event.target.checked);
    };

    useEffect(() => {
        if (user && user.mentees) {
            setData(user.mentees);
            setMenteeSessions(user.mentees);
        }
    }, [user]);

    useEffect(() => {
        const filteredData = menteeSessions.filter(mentee => 
            mentee.mentorSession?.status === 'pending'
        );

        const dataWithDateConversion = filteredData.map(mentee => {
            mentee.session_date = dayjs(mentee.session_date).format('dddd MMM D [@] hh:mm A');
            return mentee;
        });

        setData(dataWithDateConversion);
    }, [menteeSessions]);

    const handleSessionAction = async (menteeId: string, action: 'approve' | 'deny') => {
        try {
            const response = await fetch(`${APP_ENDPOINTS.SESSIONS.MENTOR}/${menteeId}/${action}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    mentorId: user.id,
                    status: action === 'approve' ? 'confirmed' : 'rejected'
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to ${action} session`);
            }

            // Update the local state to remove the processed session
            setMenteeSessions(prev => 
                prev.filter(mentee => mentee.id !== menteeId)
            );

            updateError(`Session ${action}d successfully`);
        } catch (error) {
            updateError(`Failed to ${action} session`);
        }
    };

    return (
        <>
            <FormControlLabel
                control={<Switch checked={gridView} onChange={handleChange} />}
                label={
                    <Box display="flex" alignItems="center" gap={1}>
                        {gridView ? <ViewModuleIcon /> : <ViewListIcon />}
                        <Typography>{gridView ? 'Grid View' : 'List View'}</Typography>
                    </Box>
                }
                labelPlacement="start"
            />
            <Typography variant="subtitle1" sx={{ color: "rgba(0,0,0,0.5)", padding: "10px 0 20px" }}>
                Pending Session Requests
            </Typography>
            {data.length > 0 ? (
                <Grid container spacing={2}>
                    {data.map(mentee => (
                        <Grid item key={mentee.id} xs={12} sm={6} md={4}>
                             <Box>
                                    <ListContentComponent data={mentee} />
                                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                        <Button 
                                            variant="contained" 
                                            color="success"
                                            onClick={() => handleSessionAction(mentee.id, 'approve')}
                                        >
                                            Approve
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="error"
                                            onClick={() => handleSessionAction(mentee.id, 'deny')}
                                        >
                                            Deny
                                        </Button>
                                    </Stack>
                                </Box>
                            
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <NoDataAvailable />
            )}
        </>
    );
};

export default PendingSessions; 