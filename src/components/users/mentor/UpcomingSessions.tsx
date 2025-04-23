import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

import { MentorDataType, MenteeDataType, MentorSessionDataType } from "../../../types/DataTypes";

import CardContentComponent from "../../../helpers/CardContentComponent";

import ListContentComponent from "../../../helpers/ListContentComponent";

import { Switch, FormControlLabel } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule'; // Grid icon
import ViewListIcon from '@mui/icons-material/ViewList'; // List icon
import NoDataAvailable from "../../../utils/NoDataAvailable";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { Link } from "react-router-dom";
import { APP_ENDPOINTS } from "../../../config/app";
import { useUser } from "../../../contexts/UserContext";
import { Roles } from "../../../types/Roles";



const UpcomingSessions = ({ user }: { user: MentorDataType }) => {
 
    const [gridView, setGridView] = useState(true);
    const { accessToken } = useUser();
    const [menteeSessionLookup,setMenteeSessionLookup] = useState<Map<string,MenteeDataType>>(new Map());
    const [upcominSessions,setUpcomingSessions] = useState<MentorSessionDataType[]>([]);
    const [loading, setLoading] = useState<{[key: string]: boolean}>({});
    const [sessionUrls, setSessionUrls] = useState<{[key: string]: string}>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridView(event.target.checked);
    };
    const today = dayjs();
    const twoWeeks = today.add(2,'week');

    useEffect(() => {
        console.log(`user is ${JSON.stringify(user,null,2)} `);
        if(user && user.mentees){
            let menteesList = new Map<string,MenteeDataType>();
            user.mentees.forEach(mentee => {
                let confirmedSessions = mentee.mentorSession?.filter(session => {
                    const sessionDateTime = dayjs(session.start_time).add(30,'minutes');
                    return session.status === "confirmed" && sessionDateTime.isBetween(today,twoWeeks) ;
                });

                confirmedSessions?.forEach(session => {
                    menteesList.set(session.mentee_id, {...mentee, mentorSession:confirmedSessions});
                })
                 
            });
            setMenteeSessionLookup(menteesList); 

      
        }
    }, [user])


    // && dayjs(session.session_date).isSameOrAfter(today) && dayjs(session.session_date).isBefore(twoWeeks)

    useEffect(() => {
        if(menteeSessionLookup.size === 0) return;
        const allUpcomingSessions = Array.from(menteeSessionLookup.values())
  .flatMap(mentee => mentee.mentorSession || []);
        setUpcomingSessions(allUpcomingSessions);

    }, [menteeSessionLookup])

    const generateSessionUrls = async (session: MentorSessionDataType) => {
        try {
            setLoading(prev => ({...prev, [session.id]: true}));
            
            // Check if session already has URLs
            if(session.start_url && session.join_url && 
               session.start_url.length > 0 && session.join_url.length > 0) {
                // Use existing URLs
                const urlToUse = user?.role?.type === Roles.MENTOR ? session.start_url : session.join_url;
                setSessionUrls(prev => ({...prev, [session.id]: urlToUse}));
                return;
            }

            // Generate new URLs
            let url = `${APP_ENDPOINTS.GENERIC.GENERATE_ZOOM_LINK}/${session.id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to generate session URLs');
            }

            const dataResponse = await response.json();
            const {start_url, join_url} = dataResponse['data'];
            
            // Set the appropriate URL based on user role
            const urlToUse = user?.role?.type === Roles.MENTOR ? start_url : join_url;
            setSessionUrls(prev => ({...prev, [session.id]: urlToUse}));
            
        } catch (error) {
            console.error('Error generating session URLs:', error);
        } finally {
            setLoading(prev => ({...prev, [session.id]: false}));
        }
    };

    // Check if a session is within 15 minutes of starting or up to 30 minutes after starting
    const isSessionStartingSoon = (session: MentorSessionDataType) => {
        const sessionStartTime = dayjs(session.start_time);
        const now = dayjs();
        const fifteenMinutesBeforeStart = sessionStartTime.subtract(15, 'minutes');
        const thirtyMinutesAfterStart = sessionStartTime.add(30, 'minutes');
        
        return now.isAfter(fifteenMinutesBeforeStart) && now.isBefore(thirtyMinutesAfterStart);
    };

    // Check if a session has URLs
    const hasSessionUrls = (session: MentorSessionDataType) => {
        return (session.start_url && session.join_url && 
                session.start_url.length > 0 && session.join_url.length > 0) || 
               sessionUrls[session.id];
    };

    return (
        <>

                <FormControlLabel
                    control={<Switch checked={gridView} onChange={handleChange} />}
                    label={   <Box display="flex" alignItems="center" gap={1}>
                    {gridView ? <ViewModuleIcon /> : <ViewListIcon />}
                    <Typography>{gridView ? 'Grid View' : 'List View'}</Typography>
                  </Box>}
                    labelPlacement="start"
                />
                <Typography variant="subtitle1" sx={{ color: "rgba(0,0,0,0.5)", padding: "10px 0 20px" }}>This Week's Session(s)</Typography>
                {upcominSessions.length > 0 ? (
                    <Grid container spacing={2}   > {/* container initializes the grid and spacing provides space between grid items */}
                        {
                        
                        upcominSessions.map(session => {
                            const isStartingSoon = isSessionStartingSoon(session);
                            const hasUrls = hasSessionUrls(session);
                            const sessionUrl = sessionUrls[session.id] || 
                                             (user?.role?.type === Roles.MENTOR ? session.start_url : session.join_url);
                     
                            return (
                                 
                                <Grid item key={session.id} xs={12} sm={6} md={4} > {/* item specifies a grid item. xs, sm, md, etc., determine the size of the item across different screen sizes */}
                                    {gridView ? <CardContentComponent user={menteeSessionLookup.get(session.mentee_id)!} session={session} /> : <ListContentComponent user={menteeSessionLookup.get(session.mentee_id)!} session={session} /> }
                                    
                                    {hasUrls && sessionUrl && (
                                        <Box sx={{ mt: 1 }}>
                                            <Link to={sessionUrl} target="_blank" style={{ textDecoration: 'none', width: '100%', display: 'block' }}>
                                                <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    size="small"
                                                    fullWidth
                                                    sx={{ 
                                                        borderRadius: '20px',
                                                        textTransform: 'none',
                                                        fontWeight: 'bold',
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                        background: 'linear-gradient(45deg, #ff6347 30%, #fd2f30 90%)',
                                                        '&:hover': {
                                                            background: 'linear-gradient(45deg, #fd2f30 30%, #ff6347 90%)',
                                                            boxShadow: '0 6px 10px rgba(0,0,0,0.15)',
                                                        }
                                                    }}
                                                >
                                                    Join Session
                                                </Button>
                                            </Link>
                                        </Box>
                                    )}

                                    {!hasUrls && (
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            size="small"
                                            onClick={() => generateSessionUrls(session)}
                                            disabled={loading[session.id] || !isStartingSoon}
                                            fullWidth
                                            sx={{ mt: 1 }}
                                        >
                                            {loading[session.id] ? 'Generating...' : 'Generate Meeting Link'}
                                        </Button>
                                    )}
                                </Grid>
                              
                          
                            )
                        })}
                    </Grid>
                ) : (
                    <NoDataAvailable/>
                )}

 
        </>


    )
}

export default UpcomingSessions