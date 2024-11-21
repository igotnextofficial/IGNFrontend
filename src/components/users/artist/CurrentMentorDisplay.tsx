import React, { useEffect,useState } from "react";
import { Box,Button} from "@mui/material";
import { ArtistDataType, MenteeDataType, MentorSessionDataType } from "../../../types/DataTypes";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { text } from "stream/consumers";

dayjs.extend(utc);
dayjs.extend(timezone);

const CurrentMentorDisplay = ({user}:{user:ArtistDataType}) => {
    const [cannotSchedule,setCannotSchedule] = useState(false)
    const [sessionDate,setSessionDate] = useState("")
    const [currentTime,setCurrentTime] = useState(dayjs().tz('America/New_York').format('MM/DD/YYYY [AT] hh:mm A'))
    const [sessionIsNow,setSessionIsNow] = useState(false)
    const [mentorSession,setMentorSession] = useState<MentorSessionDataType>()
    useEffect(() => {
        if(dayjs(currentTime).isSame(sessionDate)){
            setSessionIsNow(true)
        }
        
    },[sessionDate])
    useEffect(() => {
   
        if( user.mentorSession[0].session_date  ){
                setCannotSchedule(true)
                setSessionDate(dayjs(user.mentorSession[0].session_date).tz('America/New_York').format('MM/DD/YYYY [AT] hh:mm A'))
                setMentorSession(user.mentorSession[0])
               
        }
        else{
            setCannotSchedule(false)
        }
    },[user.mentorSession])
    return (
        <>
          <Box sx={{backgroundColor:"#000000"}}>
            <Box sx={{backgroundImage:`url(${user?.mentor?.profile_photo_path})`, width:"100%", height:"100dvh", maxHeight:"300px" ,backgroundSize:"cover",opacity:0.7}}></Box>
          </Box>
         {!cannotSchedule && <Button disabled={cannotSchedule} sx={{margin:"10px 0 ", color:"white"}} variant='contained'> {cannotSchedule ? "Schedule Next Session" : <Link to="/schedule">Schedule Next Session</Link> }</Button>}
         {sessionIsNow && <Box sx={styles.button_ign}><Link  to={mentorSession?.session_link || ""} >  Join Session Now </Link></Box>} 
        {sessionDate && <Box sx={{color:"#FBFAF9",backgroundColor:"#1d1917",textAlign:"center",borderRadius:"5px" , padding:"5px 0" , margin:"10px 0"}}>Next Session: {sessionDate} </Box>}
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