import React from "react";
import { Typography, Box, Grid, Button, Stack, CircularProgress } from "@mui/material";
import { SessionWithMenteeDataType, SessionStatus } from "../../../types/DataTypes";
import ListContentComponent from "../../../helpers/ListContentComponent";
import { Switch, FormControlLabel } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import NoDataAvailable from "../../../utils/NoDataAvailable";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useUser } from "../../../contexts/UserContext";
import { APP_ENDPOINTS } from "../../../config/app";
import useHttp from "../../../customhooks/useHttp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CardContentComponent from "../../../helpers/CardContentComponent";

dayjs.extend(isBetween);

const UpcomingSessions = ({ sessions }: { sessions: SessionWithMenteeDataType[] }) => {
  const [gridView, setGridView] = React.useState(true);
  const { accessToken } = useUser();
  const [upcomingSessions, setUpcomingSessions] = React.useState<SessionWithMenteeDataType[]>([]);
  const { put } = useHttp();
  const queryClient = useQueryClient();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGridView(event.target.checked);
  };

  React.useEffect(() => {
    const upcomingConfirmedSessions: SessionWithMenteeDataType[] = [];
    const now = dayjs().add(1,'hour');

    sessions.forEach((session) => {
      session.start_time = dayjs(session.start_time).format('dddd MMM D [@] hh:mm A');
      
      if (session.status === SessionStatus.SCHEDULED) {
        const sessionDate = dayjs(session.start_time);
        if (sessionDate.isAfter(now)) {
          upcomingConfirmedSessions.push(session);
        }
      }
    });

    setUpcomingSessions(upcomingConfirmedSessions);
  }, [sessions]);

  const { mutate: cancelSession, isPending } = useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await put(`${APP_ENDPOINTS.SESSIONS.BASE}/${sessionId}/cancel`, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.data;
    },
    onSuccess: (_: unknown, sessionId: string) => {
      setUpcomingSessions(prev => prev.filter(session => session.id !== sessionId));
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (error: Error) => {
      console.error('Error canceling session:', error.message);
    }
  });

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
        Upcoming Sessions
      </Typography>

      {upcomingSessions.length > 0 ? (
        <Grid container spacing={2}>
          {upcomingSessions.map((session: SessionWithMenteeDataType) => {
            const mentee = session.mentee;
            return mentee ? (
              <Grid item key={session.id} xs={12} sm={6} md={4}>
                {gridView ? (
                  <CardContentComponent session={session} />
                ) : (
                  <Box>
                    <ListContentComponent session={session} />
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Button 
                        onClick={() => cancelSession(session.id)}
                        variant="contained"   
                        color="error"
                        disabled={isPending}
                      >
                        Cancel Session
                      </Button>
                      {isPending && <CircularProgress size={20} />}
                    </Stack>
                  </Box>
                )}
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

export default UpcomingSessions;