import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { MenteeDataType, MentorSessionDataType, SessionDataType } from "../../../types/DataTypes";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import IGNButton from "../../common/IGNButton";
import useHttp from "../../../customhooks/useHttp";
import { APP_ENDPOINTS } from "../../../config/app";

dayjs.extend(utc);
dayjs.extend(timezone);

const CurrentMentorDisplay = ({ user }: { user: MenteeDataType }) => {
 
  const [session,setSession] = useState<SessionDataType>();
  const [sessionDate, setSessionDate] = useState("");
  const [hasUpcomingSession, setHasUpcomingSession] = useState(false);
  const [pendingSession, setPendingSession] = useState(false);
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [joinUrl, setJoinUrl] = useState("");
  const { get } = useHttp();
  const today = dayjs().subtract(1,'day').tz('America/New_York')
  
  useEffect(() => {},[])

  useEffect(() => {
    if(!user?.bookings) {return }
    const currentSessions = user?.bookings.map( booking => booking.current_session);
    const mostRecentSession = Math.max(...currentSessions);
   const currentBooking = user.bookings.filter((booking => booking.current_session === mostRecentSession))[0] || [];
    
 

    if (currentBooking?.sessions?.length > 0) {
    const sessions = currentBooking.sessions;
    const futureSessions = sessions.filter(session => {
        const sessionStartTime = dayjs(session.start_time).tz('America/New_York')
    
        return dayjs(session.start_time).isAfter(today);
    })    

      const pendingSession = futureSessions.find(session => {return session.status === 'pending'}) || null;

      if(pendingSession !== null){
        setPendingSession(true);
        setSessionDate(dayjs(pendingSession?.start_time).tz('America/New_York').format('MM/DD/YYYY [AT] hh:mm A'))
      }

      const upcomingSessions = futureSessions.filter( session => {
        return session.status.toLowerCase() === 'scheduled'
      }).sort((a:SessionDataType, b:SessionDataType) =>
          dayjs(a.start_time).tz('America/New_York').diff(dayjs(b.start_time).tz('America/New_York'))
        ) || null
  
      if(upcomingSessions[0]){
        const upcomingSession = upcomingSessions[0]
        const session_date = dayjs(upcomingSession.start_time).tz('America/New_York');
        const end_time = dayjs(upcomingSession.end_time).tz('America/New_York');
        setSessionDate(session_date.format('MM/DD/YYYY [AT] hh:mm A'));
        if(end_time.isBefore(today)){

            setSession(upcomingSession);
            setHasUpcomingSession(true);
        }
      }


    }
  }, [user.bookings]);

 

  useEffect(() => {
 
    if (!session) return;
 

    const sessionStart = dayjs(session.start_time).tz('America/New_York');
    const now = dayjs().tz('America/New_York');
    const isReady = now.isBetween(
      sessionStart.subtract(5, 'minutes'),
      sessionStart.add(30, 'minutes')
    );
 

    setIsSessionReady(isReady);
  }, [session]); 

  useEffect(() => {
    if (!isSessionReady || !session) return;

    const getZoomLink = async () => {
      if (session.join_url) {
        setJoinUrl(session.join_url);
        return;
      }

      try {
        const url = APP_ENDPOINTS.GENERIC.GENERATE_ZOOM_LINK.replace(
          ':session_id',
          session.id || ''
        );
        const response = await get(url);
        
        if (response.status === 200) {
          return response.data
        }
      } catch (error) {
 
        throw new Error('Zoom Generation failed')
      }
    };

    getZoomLink().then(response => {
        setJoinUrl(response.join_url)
    }).catch(error => {});
  }, [isSessionReady,session]);

  return (
    <>
      <Box sx={{ backgroundColor: "#000000" }}>
        <Box
          sx={{
            backgroundImage: `url(${user?.mentor?.profile_photo_path})`,
            width: "100%",
            height: "100dvh",
            maxHeight: "300px",
            backgroundSize: "cover",
            opacity: 0.7,
          }}
        ></Box>
      </Box>

 
         {
           isSessionReady && joinUrl && (
              <Box sx={styles.button_ign}>
                <Link to={joinUrl}>Join Session Now</Link>
              </Box>
           )
        } 
      {!hasUpcomingSession && !pendingSession && (
        <IGNButton>
          <Link to="/schedule">
            <Typography sx={{ color: "#FBFAF9" }}>Schedule Next Session</Typography>
          </Link>
        </IGNButton>
      )}

      {hasUpcomingSession && (
        <Box sx={styles.sessionInfo}> {isSessionReady ? 'Session Is Now:': 'Next Session:'} {sessionDate}</Box>
      )}

      {pendingSession && (
        <Box sx={styles.sessionInfo}>Waiting on Approval for Session On: {sessionDate}</Box>
      )}
    </>
  );
};

const styles = {
  button_ign: {
    margin: "10px 0",
    padding: "5px 0",
    textAlign: "center",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "20px",
    color: "black",
    textTransform: "none",
    '&:hover': {
      backgroundColor: '#f8f8f8',
      borderColor: '#bbb'
    }
  },
  sessionInfo: {
    color: "#FBFAF9",
    backgroundColor: "#1d1917",
    textAlign: "center",
    borderRadius: "5px",
    padding: "5px 0",
    margin: "10px 0",
  },
};

export default CurrentMentorDisplay;
