import React, { useEffect,useState } from "react";
import { Box,Button} from "@mui/material";
import { ArtistDataType } from "../../../Types/DataTypes";
import { Link } from "react-router-dom";

const CurrentMentorDisplay = ({user}:{user:ArtistDataType}) => {
    const [cannotSchedule,setCannotSchedule] = useState(false)
    useEffect(() => {
        if(user.mentorSession && user.mentorSession.nextSession !== null ){
                setCannotSchedule(true)
        }
        else{
            setCannotSchedule(false)
        }
    },[user.mentorSession])
    return (
        <>
          <Box sx={{backgroundColor:"#000000"}}>
            <Box sx={{backgroundImage:`url(${user?.mentor.image})`, width:"100%", height:"100dvh", maxHeight:"300px" ,backgroundSize:"cover",opacity:0.7}}></Box>
          </Box>
         <Button disabled={cannotSchedule} sx={{margin:"10px 0 "}} variant='contained'> {cannotSchedule ? "Schedule Next Session" : <Link to="/schedule">Schedule Next Session</Link> }</Button>
        </>
    )
}

export default CurrentMentorDisplay