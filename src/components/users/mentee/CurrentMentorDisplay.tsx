import React, { useEffect,useState } from "react";
import { Box,Typography } from "@mui/material";
import { MenteeDataType, MentorSessionDataType } from "../../../types/DataTypes";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import IGNButton from "../../common/IGNButton";

dayjs.extend(utc);
dayjs.extend(timezone);

const CurrentMentorDisplay = ({user}:{user:MenteeDataType}) => {
    const [cannotSchedule,setCannotSchedule] = useState(false)
    const [sessionDate,setSessionDate] = useState("")
    const [currentTime,setCurrentTime] = useState(dayjs().tz('America/New_York').format('MM/DD/YYYY [AT] hh:mm A'))
    const [sessionIsNow,setSessionIsNow] = useState(false)
    const [hasUpcomingSession,setHasUpcomingSession] = useState(false)
    const [pendingSession,setPendingSession] = useState(false)
 
    const [mentorSession,setMentorSession] = useState<MentorSessionDataType>()
    useEffect(() => {
        console.log(user.mentorSession)
        if(user.mentorSession.length > 0){
            const sessions_within_timeframe = user.mentorSession.filter((session:MentorSessionDataType) => {
                  return dayjs(session.start_time).tz('America/New_York').isSame(dayjs().tz('America/New_York')) || dayjs(session.start_time).tz('America/New_York').isAfter(dayjs().tz('America/New_York'));
            });

            const upcoming_sessions = sessions_within_timeframe.filter((session:MentorSessionDataType) => {
                return session.status.toLowerCase() === 'confirmed'
            })

            const pending_sessions = sessions_within_timeframe.filter((session:MentorSessionDataType) => {
                return session.status.toLowerCase() === 'pending'
            })

            if( upcoming_sessions.length > 0){
                let session = upcoming_sessions[0]
        

                    setHasUpcomingSession(true)
                    setCannotSchedule(true)
                    setSessionDate(dayjs(session.start_time).tz('America/New_York').format('MM/DD/YYYY [AT] hh:mm A'))
                    setMentorSession(upcoming_sessions[0])
                
            }

            if(pending_sessions.length > 0) {
                let pending_session = pending_sessions[0]
                setSessionDate(dayjs(pending_session.start_time).tz('America/New_York').format('MM/DD/YYYY [AT] hh:mm A'))
                setPendingSession(true)
                setCannotSchedule(true)
            }
        }
        
        
    },[])



    useEffect(() => {
        if(dayjs(currentTime).isSame(sessionDate)){
            setSessionIsNow(true)
        }
        
    },[sessionDate])

    // Check if a session is within 5 minutes of starting or up to 30 minutes after starting
    const isSessionActive = () => {
        if (!mentorSession?.start_time) return false;
        
        const sessionStartTime = dayjs(mentorSession.start_time);
        const now = dayjs();
        const fiveMinutesBeforeStart = sessionStartTime.subtract(5, 'minutes');
        const thirtyMinutesAfterStart = sessionStartTime.add(30, 'minutes');
        
        return now.isAfter(fiveMinutesBeforeStart) && now.isBefore(thirtyMinutesAfterStart);
    };
 
    return (
        <>
          <Box sx={{backgroundColor:"#000000"}}>
            <Box sx={{backgroundImage:`url(${user?.mentor?.profile_photo_path})`, width:"100%", height:"100dvh", maxHeight:"300px" ,backgroundSize:"cover",opacity:0.7}}></Box>
          </Box>
         {!cannotSchedule && <IGNButton disabled={cannotSchedule}>{cannotSchedule ? "Schedule Next Session" : <Link to="/schedule"> <Typography sx={{color:"#FBFAF9"}}> Schedule Next Session</Typography></Link>}</IGNButton>}
         {isSessionActive() && <Box sx={styles.button_ign}><Link  to={mentorSession?.join_url|| ""} >  Join Session Now </Link></Box>} 
        {hasUpcomingSession && <Box sx={{color:"#FBFAF9",backgroundColor:"#1d1917",textAlign:"center",borderRadius:"5px" , padding:"5px 0" , margin:"10px 0"}}>Next Session: {sessionDate} </Box>}
        {pendingSession && <Box sx={{color:"#FBFAF9",backgroundColor:"#1d1917",textAlign:"center",borderRadius:"5px" , padding:"5px 0" , margin:"10px 0"}}>Waiting on Approval for Session On: {sessionDate} </Box>}
        </>
    )
}

const styles={
    button_ign:{
        margin:"10px 0",
        padding:"5px 0",
        textAlign: 'center',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '20px',
        color: 'black',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#f8f8f8',
          borderColor: '#bbb'
        }
         
      
    }
}

export default CurrentMentorDisplay