import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Button,Box, Typography , Grid} from '@mui/material';

import { sendRequest } from '../utils/helpers';
import { HttpMethods, MenteeDataType } from '../types/DataTypes';
import { useUser } from '../contexts/UserContext';
import { APP_ENDPOINTS } from '../config/app';



const AvailableTimes = ({time, handleTime, isAvailable} : {time:string, handleTime:(time:string,available:boolean) => void, isAvailable:boolean})  => {
    return (
        <>
        <Button onClick={() => {handleTime(time,isAvailable)}}>
        <Box sx={ isAvailable ? styles.pill : styles.default}>
           <Typography variant='subtitle1'> {time} </Typography>
        </Box>
        </Button>
        </>
    )
}
const ScheduleTime = () => {
    const {user,accessToken} = useUser()
    const [schedule,setSchedule] = useState<string | null>(null)
    const [chosenTime,setChosenTime] = useState<string>("")
    const [availableTime,setAvailableTime] = useState<string[]>([])
    const [scheduledSuccessfully,setScheduledSuccessfully] = useState<boolean>(false)

    const [allTime,setAllTime] = useState<string[]>([])

    const today = dayjs();
    const maxDate = today.add(14,'day');

    useEffect(() => {},[scheduledSuccessfully])
 
    useEffect(() => {
        if(allTime.length === 0){
        let morningSchedule = new Set()
        let afternoonSchedule = new Set()

        while ( morningSchedule.size < 8) {
            const fandomNumber = Math.floor(Math.random() * 12) + 1;

            // Randomly choose between ":00" and ":30"
            const minutes = Math.random() < 0.5 ? ":00" : ":30";
            if(fandomNumber > 7 && fandomNumber < 12){
                morningSchedule.add(`${fandomNumber}${minutes} AM`)
            }
            
        }

        while ( afternoonSchedule.size < 22) {
            const fandomNumber = Math.floor(Math.random() * 12) + 1;

            // Randomly choose between ":00" and ":30"
            const minutes = Math.random() < 0.5 ? ":00" : ":30";
          
                afternoonSchedule.add(`${fandomNumber}${minutes} PM`)
            
            
        }
            let times = [...Array.from(morningSchedule),...Array.from(afternoonSchedule)]
            setAllTime(times as string [])

    }
      
  

    },[allTime])
    useEffect(() => {
 
       if(schedule ){
                let times = new Set()
                while(times.size < 6) {
                const fandomNumber = Math.floor(Math.random() * 12) + 1;

                // Randomly choose between ":00" and ":30"
                const minutes = Math.random() < 0.5 ? ":00" : ":30";
            
                // Randomly assign "AM" or "PM"
                const period = Math.random() < 0.5 ? "AM" : "PM";
                    times.add(`${fandomNumber}${minutes} ${period}`)
                
            }
            setAvailableTime(Array.from(times) as string[])
           
       }

       return () => {
            setAvailableTime([])
       }
       
    },[schedule])

    const scheduleDate = async() => {
        let data = {
             session_date:`${schedule} ${chosenTime}`,
             mentee_id: user?.id,
             mentor_id: user?.mentor.id
            }

           
            if(schedule && chosenTime){
                let currentuser = user as MenteeDataType
                const headers = { Authorization: `Bearer ${accessToken}` }
                // console.log(JSON.stringify({data}))
                let url = APP_ENDPOINTS.SESSIONS.BASE;
                // console.log(`sending to ${url}`)
                let response = await sendRequest(HttpMethods.POST,url,{data},headers)

                if(response !== null){
                    setScheduledSuccessfully(true)
                }
            }
        
    }


    const handleTimeChange = (value:string,available:boolean) => {
        if(available){
            setChosenTime(value)
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={dayjs(schedule)} onChange={(value) => { 
                    if(value){
                        
                        setSchedule(value?.format('MM/DD/YYYY'))
                    }
                   
                   
                
                }}
             
                minDate={today}
                maxDate={maxDate}
                />


                <Typography variant='h3'>{schedule?.toString()}</Typography>
                <Grid container>
                {availableTime.length > 0 && allTime.map((currentTime) => <Grid item xs={4}><AvailableTimes time={currentTime} handleTime={handleTimeChange} isAvailable={availableTime.includes(currentTime)}/></Grid> )}

                
                </Grid>
                {
                    (chosenTime && schedule) &&
                    <Button  variant='contained' onClick={() => {  scheduleDate() }}>Schedule Appointment</Button>
                }

         

            {scheduledSuccessfully && (
                <Typography 
                    variant="h6" 
                    color="success" 
                    sx={{ marginTop: 2 }}
                >
                    Appointment scheduled successfully!
                </Typography>
            )}
               
        </LocalizationProvider>
    )
}


const styles = {
    pill:{
        color:"#1d1917",
        backgroundImage: "linear-gradient(to right,#ebd805,#eee154 )",
        borderRadius:"3px",
        textDecoration:"none",
        fontSize:"0.8em",
        width:"100px",
        textAlign:"center",
        padding:"5px 8px",
        cursor:"pointer"
        
    },

    default:{
        color: "#6c757d",  // A muted grey, commonly used for disabled elements
        backgroundImage: "linear-gradient(to right, #ccc, #ddd)",  // Muted gradient
        borderRadius: "3px",
        textDecoration: "none",
        fontSize: "0.8em",
        width: "100px",
        textAlign: "center",
        padding: "5px 8px",
        cursor: "not-allowed",  // Change cursor to indicate non-interactive element
        opacity: 0.65  // Reduce opacity to enhance the disabled look
        
    },
}
export default ScheduleTime