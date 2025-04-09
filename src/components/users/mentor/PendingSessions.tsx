import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Button, Stack } from "@mui/material";
import { MentorDataType, MenteeDataType, MentorSessionDataType  } from "../../../types/DataTypes";
 
import ListContentComponent from "../../../helpers/ListContentComponent";
import { Switch, FormControlLabel } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import NoDataAvailable from "../../../utils/NoDataAvailable";
import dayjs from "dayjs";
import { useUser } from "../../../contexts/UserContext";
import { useErrorHandler } from "../../../contexts/ErrorContext";
import { APP_ENDPOINTS } from "../../../config/app";

const SessionCard = ({ session,mentees,callback }: { session: MentorSessionDataType,mentees:Map<string,MenteeDataType>,callback:(mentee: MenteeDataType, action: 'approve' | 'deny', session: MentorSessionDataType) => void }) => {
    const mentee = mentees.get(session.mentee_id);
    if (!mentee) return null;
  
    return (
      <Box>
        <ListContentComponent user={mentee} session={session} />
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button 
            variant="contained" 
            color="success"
            onClick={() => callback(mentee, 'approve', session)}
          >
            Approve
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => callback(mentee, 'deny', session)}
          >
            Deny
          </Button>
        </Stack>
      </Box>
    );
  }


const PendingSessions = ({ user }: { user: MentorDataType }) => {
 
    const [gridView, setGridView] = useState(true);
    const [ ,setSuccess] = useState(false);
    const {  accessToken } = useUser();
    const { updateError } = useErrorHandler();

    const [sessions,setSessions] = useState<MentorSessionDataType[]>([]);
    const [mentees,setMentees] = useState<Map<string,MenteeDataType>>(new Map());

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridView(event.target.checked);
    };

    useEffect(() => {
   
  
        if (user && user.mentees) {
          
            let menteesList = new Map<string,MenteeDataType>();
            user.mentees.forEach((mentee:MenteeDataType )=> {
                const id = mentee.id;
               if(!menteesList.has(id)){
                   menteesList.set(id,{
                        ...mentee
                   });
               }
            })

            setMentees(menteesList);
            console.log(`mentor session is ${JSON.stringify(user.mentorSession,null,2)}`)
 
        }
    }, [user]);


 useEffect(() => {
    const pendingSessions:MentorSessionDataType[] = []
    mentees.keys().forEach((key) => {
       const pendingSessionsTemp =  mentees.get(key)?.mentorSession?.filter((session:MentorSessionDataType) => {
            console.log(`checking the status of session ${session.status}`)
            return session.status === 'pending'
        }).map((session:MentorSessionDataType) => {
            session.session_date = dayjs(session.session_date).format('dddd MMM D [@] hh:mm A');
            return session;
        })

        if(pendingSessionsTemp){
            pendingSessions.push(...pendingSessionsTemp);
        }
    })
    setSessions(pendingSessions);
    console.log(`pending sessions are ${JSON.stringify(pendingSessions,null,2)}`)
 },[mentees])
 

    const handleSessionAction = async (mentee: MenteeDataType, action: 'approve' | 'deny', session:MentorSessionDataType) => {
        try {
            console.log(`attempting to handle session `)
            if((!mentee || !mentee.id) || (!session || !session.id)) {return }
            console.log(`mentee id is ${mentee.id} and session id is ${session.id}`)
            console.log(`the session date is ${session.start_time}`)
            const options = {
                id:session.id,
                agenda:`Session between ${mentee?.fullname} and Mentor ${user?.fullname}`,
                topic:'Mentorship Chat',
                invitees: [
                    {email:mentee?.email},
                    {email:user?.email}
                ],
                
                start_time:session?.start_time 

            }
            console.log(`the options are created`)
            const mentor_action = action === 'approve' ? 'confirmed' : 'rejected'
            const session_id = session.id;
            await handleUpdateSessionStatus(session.id,mentor_action);
            if(action === 'approve'){ 
                let zoomResponse = await handleUpdateSessionLink(options);
                if(!zoomResponse.ok){
                    throw new Error('error: cannot update a session link')
                }
            }


            // Update the local state to remove the processed session
            setSessions(prev => 
                prev.filter(session => session.id !== session_id)
            );

            setSuccess(true);
        } catch (error) {
            console.log(error)
            setSuccess(false);
            updateError(`Failed to ${action} session because ${error}`);
        }
    };

    const handleUpdateSessionStatus = async(session_id: string, action: 'confirmed' | 'rejected') => {
        const response = await fetch(`${APP_ENDPOINTS.SESSIONS.MENTOR}/${session_id}/${action}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            } 
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

            {sessions.length > 0  ? (
                <Grid container spacing={2}>
                    {sessions.map((session:MentorSessionDataType) => (
                        <Grid item key={session.id} xs={12} sm={6} md={4}>
              
                            <SessionCard session={session} mentees={mentees} callback={handleSessionAction} />                         
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