import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Button, Stack, CircularProgress } from "@mui/material";
import { MentorDataType, MenteeDataType, MentorSessionDataType, SessionWithMenteeDataType, SessionStatus } from "../../../types/DataTypes";
 
import ListContentComponent from "../../../helpers/ListContentComponent";
import { Switch, FormControlLabel } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import NoDataAvailable from "../../../utils/NoDataAvailable";
import dayjs from "dayjs";
import { useUser } from "../../../contexts/UserContext";
import { useErrorHandler } from "../../../contexts/ErrorContext";
import { APP_ENDPOINTS } from "../../../config/app";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const SessionCard = ({ session, callback }: { 
  session: SessionWithMenteeDataType,
  callback: (success:boolean,session_id:string)=>void
 
}) => {
  const { accessToken } = useUser();
  const { updateError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);
 
  const handleCloseOutSession = ()=>{
    console.log("Closing out session", session);
    setIsLoading(true);
    axios.put(`${APP_ENDPOINTS.SESSIONS.BASE}/${session.id}/complete`,{
      session_id: session.id,
    },{
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    .then((response) => {
      console.log("Session closed", response);
 
      callback(true,session.id);
    })
    .catch((error) => {
      updateError(error);
      callback(false,session.id);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }
  return (
    <Box>
      <ListContentComponent   session={session} />
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <Button 
          onClick={handleCloseOutSession}
        
          variant="contained"   
          color="primary"
        >
          Close Out Session
        </Button>
       {isLoading && <CircularProgress size={20} />}
      </Stack>
    </Box>
  );
}

const closeOutSessions = ({ sessions }: { sessions: SessionWithMenteeDataType[] }) => {
  const [gridView, setGridView] = useState(true);
   const [pastSessions, setPastSessions] = useState<SessionWithMenteeDataType[]>([]);
 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGridView(event.target.checked);
  };

 

  useEffect(() => {
    const pastConfirmedSessions: SessionWithMenteeDataType[] = [];
    const now = dayjs().add(1,'hour');

    sessions.forEach((session) => {
      // Format the session date for display
      session.start_time = dayjs(session.start_time).format('dddd MMM D [@] hh:mm A');
      
      // Check if session is confirmed and in the past
      if (session.status === SessionStatus.SCHEDULED) {
        const sessionDate = dayjs(session.start_time);
        if (sessionDate.isBefore(now)) {
              pastConfirmedSessions.push(session);
        }
      }
    });
 

    setPastSessions(pastConfirmedSessions);
  }, [sessions]);

  const handleCloseOutSession = (success: boolean,session_id:string) => {
    if (success) {
      // Refresh the sessions list or update UI as needed
    
      setPastSessions(pastSessions.filter((session) => session.id !== session_id));
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

      <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.7)", padding: "20px 0 10px", mt: 2 }}>
        Past Sessions to Close Out
      </Typography>

      {pastSessions.length > 0 ? (
        <Grid container spacing={2}>
          {pastSessions.map((session:  SessionWithMenteeDataType) => {
            const mentee =  session.mentee
            return mentee ? (
              <Grid item key={session.id} xs={12} sm={6} md={4}>
                <SessionCard 
                  session={session} 
                  callback={handleCloseOutSession}
                />
              </Grid>
            ) : null;
          })}
        </Grid>
      ) : (
        <NoDataAvailable />
      )}
    </>
  );
};

export default closeOutSessions; 