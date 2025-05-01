import React from "react";
import { Typography, Box, Grid, Button, Stack, CircularProgress } from "@mui/material";
import { SessionWithMenteeDataType, SessionStatus } from "../../../types/DataTypes";
import ListContentComponent from "../../../helpers/ListContentComponent";
import { Switch, FormControlLabel } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import NoDataAvailable from "../../../utils/NoDataAvailable";
import dayjs from "dayjs";
import { useUser } from "../../../contexts/UserContext";
import { useErrorHandler } from "../../../contexts/ErrorContext";
import { APP_ENDPOINTS } from "../../../config/app";
import useHttp from "../../../customhooks/useHttp";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SessionCard = ({ session, callback }: { 
  session: SessionWithMenteeDataType,
  callback: (success: boolean, session_id: string) => void
}) => {
  const { accessToken } = useUser();
  const { updateError } = useErrorHandler();
  const { post } = useHttp();
  const queryClient = useQueryClient();

  const { mutate: closeOutSession, isPending } = useMutation({
    mutationFn: async () => {
      const response = await post(`${APP_ENDPOINTS.SESSIONS.BASE}/${session.id}/complete`, {
        session_id: session.id,
      }, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      return response.data;
    },
    onSuccess: () => {
      callback(true, session.id);
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (error: Error) => {
      updateError(error.message);
      callback(false, session.id);
    }
  });

  return (
    <Box>
      <ListContentComponent session={session} />
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <Button 
          onClick={() => closeOutSession()}
          variant="contained"   
          color="primary"
          disabled={isPending}
        >
          Close Out Session
        </Button>
        {isPending && <CircularProgress size={20} />}
      </Stack>
    </Box>
  );
}

const CloseOutSessions = ({ sessions }: { sessions: SessionWithMenteeDataType[] }) => {
  const [gridView, setGridView] = React.useState(true);
  const [pastSessions, setPastSessions] = React.useState<SessionWithMenteeDataType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGridView(event.target.checked);
  };

  React.useEffect(() => {
    const pastConfirmedSessions: SessionWithMenteeDataType[] = [];
    const now = dayjs().add(1,'hour');

    sessions.forEach((session) => {
      session.start_time = dayjs(session.start_time).format('dddd MMM D [@] hh:mm A');
      
      if (session.status === SessionStatus.SCHEDULED) {
        const sessionDate = dayjs(session.start_time);
        if (sessionDate.isBefore(now)) {
          pastConfirmedSessions.push(session);
        }
      }
    });

    setPastSessions(pastConfirmedSessions);
  }, [sessions]);

  const handleCloseOutSession = (success: boolean, session_id: string) => {
    if (success) {
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
          {pastSessions.map((session: SessionWithMenteeDataType) => {
            const mentee = session.mentee;
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

export default CloseOutSessions; 