import React, { useEffect, useState } from "react"
import { Box,Typography } from "@mui/material"
import { useUser } from "../../Contexts/UserContext"
import { MenteeDataType, MentorDataType } from "../../Types/DataTypes"
import MainHolderComponent from "../../Helpers/MainHolderComponent"
import ScheduleTime from "../../Components/ScheduleTime"
import IgnPillComponent from "../../Helpers/IgnPillComponent"
import dayjs from 'dayjs';



const ScheduledSucces = () => {
    return (
        <>
        <Typography sx={{ paddingTop: 2, paddingBottom: 2 }} variant="h4" >{`Your session was scheduled successfully`}</Typography>
        </>
    )
}


const Scheduler = ({currentMentor}:{currentMentor:MentorDataType | null}) => {

    return (

        <>
            <Typography sx={{ paddingTop: 2, paddingBottom: 2 }} variant="h4" >{`Schedule your session with ${currentMentor?.fullname}`}</Typography>
                <Box sx={{ maxWidth: '600px' }}>
                    <IgnPillComponent description={`Mentor: ${currentMentor?.fullname}`} link="" />
                        <img style={{ width: "100%",border:"2px solid #ecdb22 " }} src={currentMentor?.image} alt={currentMentor?.fullname} />
                </Box>
                <ScheduleTime/>
        </>
    )
}
const ScheduleSession = () => {
    const { user } = useUser()
    const [currentMentor,setCurrentMentor] = useState <MentorDataType | null>(null)
    const [scheduledSuccessfully,setScheduledSuccessfully] = useState<boolean>(false)

    useEffect(() => {
        let currentUser = user as MenteeDataType
        if( currentUser && 'mentorSession' in currentUser){
            let sessions = currentUser.mentorSession || [];
             let upcomingSession = sessions.find(session => dayjs(session.nextSession) >= dayjs())
             if(upcomingSession){
                setScheduledSuccessfully(true)
             }
        }
       
    },[user])
    
    useEffect(() => {
        if(currentMentor === null){
            if(user && 'mentor' in user){
                setCurrentMentor(user?.mentor as MentorDataType)
            }
        }
       
    },[user,currentMentor])
    return (
           <MainHolderComponent>
                {scheduledSuccessfully ? <ScheduledSucces/>  : <Scheduler currentMentor={currentMentor} />}
            </MainHolderComponent> 
    )
}

export default ScheduleSession