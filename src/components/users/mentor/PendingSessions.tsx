import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Button, Stack } from "@mui/material";
import { MentorDataType, MenteeDataType, MentorSessionDataType, SessionWithMenteeDataType } from "../../../types/DataTypes";
import ListContentComponent from "../../../helpers/ListContentComponent";
import { Switch, FormControlLabel } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import NoDataAvailable from "../../../utils/NoDataAvailable";
import { useUser } from "../../../contexts/UserContext";
import { useErrorHandler } from "../../../contexts/ErrorContext";
import { APP_ENDPOINTS } from "../../../config/app";

const SessionCard = ({ session,callback }: { session: SessionWithMenteeDataType,callback:(action: 'approve' | 'deny', session: SessionWithMenteeDataType) => void }) => {
    const mentee = session.mentee;
    if (!mentee) return null;
  
    return (
      <Box>
        <ListContentComponent session={session} />
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button 
            variant="contained" 
            color="success"
            onClick={() => callback( 'approve', session)}
          >
            Approve
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => callback( 'deny', session)}
          >
            Deny
          </Button>
        </Stack>
      </Box>
    );
  }


const PendingSessions = ({ sessions }: { sessions: SessionWithMenteeDataType[] }) => {
 
    const [gridView, setGridView] = useState(true);
    const [ ,setSuccess] = useState(false);
    const {  user,accessToken } = useUser();
    const { updateError } = useErrorHandler();

    const [pendingSessions,setPendingSessions] = useState<SessionWithMenteeDataType[]>([]);
 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridView(event.target.checked);
    };

    useEffect(()=>{
        if(!sessions.length){
            return;
        }
        setPendingSessions(sessions.filter((session:SessionWithMenteeDataType)=>session.status === 'pending'))
    },[sessions])

 

    const handleSessionAction = async (  action: 'approve' | 'deny', session:SessionWithMenteeDataType) => {
        try {
            console.log(`attempting to handle session `)
            if((!session.mentee || !session.mentee.id) || (!session || !session.id)) {return }
      
            const options = {
                id:session.id,
                agenda:`Session between ${session.mentee?.fullname} and Mentor ${user?.fullname}`,
                topic:'Mentorship Chat',
                invitees: [
                    {email:session.mentee?.email},
                    {email:user?.email}
                ],
                
                start_time:session?.start_time 

            }
             
            const mentor_action = action === 'approve' ? 'scheduled' : 'rejected'
            const session_id = session.id;
            await handleUpdateSessionStatus(session.id,mentor_action);
            if(action === 'approve'){ 
                let zoomResponse = await handleUpdateSessionLink(options);
                if(!zoomResponse.ok){
                    throw new Error('error: cannot update a session link')
                }
            }

            setPendingSessions(prev => 
                prev.filter(session => session.id !== session_id)
            );

            setSuccess(true);
        } catch (error) {
  
            setSuccess(false);
            updateError(`Failed to ${action} session because ${error}`);
        }
    };

    const handleUpdateSessionStatus = async(session_id: string, action: 'scheduled' | 'rejected') => {
        const response = await fetch(`${APP_ENDPOINTS.SESSIONS.MENTOR}/${session_id}/${action}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                status:action,
                mentor_id:user?.id
            })

        });


        if (!response.ok) {
            throw new Error(`Failed to ${action} session`);
        }

        return response;
    }
    const handleUpdateSessionLink = async (options:Record<string,any>) => {
        const response = await fetch(`${APP_ENDPOINTS.GENERIC.VIDEO_LINK}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                data:{...options}
            })
        });

        if(!response.ok){
            throw new Error('error: cannot update a session link')
        }
        else{
            return response;
        }

    }


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

            {pendingSessions.length > 0  ? (
                <Grid container spacing={2}>
                    {pendingSessions.map((session:SessionWithMenteeDataType) => (
                        <Grid item key={session.id} xs={12} sm={6} md={4}>
              
                            <SessionCard session={session}  callback={handleSessionAction} />                         
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