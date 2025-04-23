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
import { Link as RouterLink } from "react-router-dom";

const SessionCard = ({ session, mentee }: { 
  session: MentorSessionDataType, 
  mentee: MenteeDataType
}) => {
  if (!mentee) return null;
  
  return (
    <Box>
      <ListContentComponent user={mentee} session={session} />
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <Button 
          component={RouterLink}
          to={`/session/${mentee.id}/closeout/${session.id}`}
          variant="contained" 
          color="primary"
        >
          Close Out Session
        </Button>
      </Stack>
    </Box>
  );
}

const closeOutSessions = ({ user }: { user: MentorDataType }) => {
  const [gridView, setGridView] = useState(true);
  const { accessToken } = useUser();
  const { updateError } = useErrorHandler();

  const [pastSessions, setPastSessions] = useState<MentorSessionDataType[]>([]);
  const [mentees, setMentees] = useState<Map<string, MenteeDataType>>(new Map());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGridView(event.target.checked);
  };

  useEffect(() => {
    if (user && user.mentees) {
      let menteesList = new Map<string, MenteeDataType>();
      user.mentees.forEach((mentee: MenteeDataType) => {
        const id = mentee.id;
        if (!menteesList.has(id)) {
          menteesList.set(id, {
            ...mentee
          });
        }
      });

      setMentees(menteesList);
    }
  }, [user]);

  useEffect(() => {
    const pastConfirmedSessions: MentorSessionDataType[] = [];
    const now = dayjs().add(1,'hour');

    mentees.forEach((mentee) => {
      if (mentee.mentorSession) {
        mentee.mentorSession.forEach((session: MentorSessionDataType) => {
          // Format the session date for display
          session.session_date = dayjs(session.session_date).format('dddd MMM D [@] hh:mm A');
          
          // Check if session is confirmed and in the past
          if (session.status === 'confirmed') {
            const sessionDate = dayjs(session.start_time);
            if (sessionDate.isBefore(now)) {
              pastConfirmedSessions.push(session);
            }
          }
        });
      }
    });

    setPastSessions(pastConfirmedSessions);
  }, [mentees]);

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
          {pastSessions.map((session: MentorSessionDataType) => {
            const mentee = mentees.get(session.mentee_id);
            return mentee ? (
              <Grid item key={session.id} xs={12} sm={6} md={4}>
                <SessionCard 
                  session={session} 
                  mentee={mentee} 
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