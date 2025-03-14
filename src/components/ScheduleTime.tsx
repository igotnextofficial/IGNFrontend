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
 


const AvailableTimes = ({ activeTime = false, time, handleTime, isAvailable} : {activeTime:boolean ,time:string, handleTime:(time:string,available:boolean) => void, isAvailable:boolean})  => {

    const [currentStyle,setCurrentStyle] = useState({})
    useEffect(() => {
        if(activeTime){
            setCurrentStyle(styles.active)
        }
        else{
            if(isAvailable){
                setCurrentStyle(styles.pill)
            }
            else{
                setCurrentStyle(styles.default)
            }
        }
    },[activeTime])
    return (
        <>
        <Button onClick={() => {handleTime(time,isAvailable)}}>
        <Box sx={[currentStyle, styles.timePill]}>
           <Typography variant='subtitle1'> {time} </Typography>
        </Box>
        </Button>
        </>
    )
}


const ScheduleTime = () => {
    const {user,accessToken} = useUser()
    const [mentor,setMentor] = useState<MenteeDataType | null>(null)
    const [schedule,setSchedule] = useState<string | null>(null)
    const [chosenTime,setChosenTime] = useState<string>("") 

    const [availableTime,setAvailableTime] = useState<string[]>([])
    const [mentorScheduledTimes,setMentorScheduledTimes] = useState<Map<string,string[]>>(new Map())
    const [scheduledSuccessfully,setScheduledSuccessfully] = useState<boolean>(false)

    const [allTime,setAllTime] = useState<string[]>([])

    const today = dayjs();
    const maxDate = today.add(14,'day');

    useEffect(() => {
        setMentor(user?.mentor);
    },[user]);

    // set all possible times
    useEffect(() => {
 
        let scheduledTimes = new Set();
        
        let startTime = dayjs("06:00:00 AM","HH:mm:ss A");
        let endTime = dayjs("11:59:00 PM","HH:mm:ss A");
            
        while(startTime.isBefore(endTime)){
            scheduledTimes.add(startTime.format('h:mm A'));
            startTime = startTime.add(60,'minute');
        
        }
        let times = [ ...Array.from(scheduledTimes) ]
        setAllTime(times as string [])
     },[])
    
     // set the mentors schedule of available times
    useEffect(() => {
        if(mentor){
            let mentorScheduleRecord = new Map();
            console.log(mentor)
            let mentorSchedule = mentor.schedule || [];
            mentorSchedule.forEach((schedule:Record<string,any>) => {
                if(schedule.status !== "available"){return}

                let date = schedule.date;
                let time = dayjs(schedule.datetime.time,"HH:mm:ss").format('h:mm A');
                
                
                if(mentorScheduleRecord.has(date)){
                    let times = mentorScheduleRecord.get(date);
                    times.push(time)
                    mentorScheduleRecord.set(date,times)
                }
                else{
                    mentorScheduleRecord.set(date,[time])
                }
               
            })

            setMentorScheduledTimes(mentorScheduleRecord);
        }
    },[mentor])


    useEffect(() => {
        let today = dayjs();
        let chosenDate = dayjs(schedule);
        if(!(today.isSame(chosenDate,'day'))){
            let compareDate = chosenDate.format('YYYY-MM-DD');
            let BookedSession = mentorScheduledTimes.has(compareDate);
            
            if (BookedSession){
                let bookedTimes = mentorScheduledTimes.get(compareDate) as string[]
                 let availableTimes = allTime.filter((time) => 
                    {
                        let timeIsFree = !bookedTimes.includes(time);
                        if (timeIsFree){
                            return time
                        }
                             
                    }
                );
                setAvailableTime(availableTimes)
            }
            else{
                setAvailableTime(allTime)
            }

        }
        else{
            setAvailableTime([])
        }
    
    },[schedule])


    useEffect(() => {},[scheduledSuccessfully])
 

 

    const scheduleDate = async() => {
        
        let data = {
             session_date:`${schedule} ${chosenTime}`,
             mentee_id: user?.id,
             mentee:{fullname:user?.fullname,email:user?.email},
             mentor_id: user?.mentor.id,
             mentor:{fullname:user?.mentor.fullname,email:user?.mentor.email,schedule:user?.mentor.schedule}
            }

            

           
            if(schedule && chosenTime){
                let currentuser = user as MenteeDataType
                const headers = { Authorization: `Bearer ${accessToken}` }
         
                let url = APP_ENDPOINTS.SESSIONS.BASE;
              
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
   
                    if(value){ setSchedule(value?.format('MM/DD/YYYY')) }
                 }}
             
                minDate={today}
                maxDate={maxDate}
                />


                
                <Grid container>
                {  allTime.map((currentTime) => {
              
                    let currentlyActive = chosenTime === currentTime ? true : false;
                    return <Grid item xs={4}><AvailableTimes activeTime={currentlyActive} time={currentTime} handleTime={handleTimeChange} isAvailable={(availableTime.includes(currentTime))}/></Grid>
                    
                    })}

                
                </Grid>
                {
                    (chosenTime && schedule) &&
                    <>
                    <Button  variant='contained' onClick={() => {  scheduleDate() }}>Schedule Appointment for {schedule?.toString() } @ {chosenTime}</Button>
                    
                    </>
                    
                    
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
    timePill:{
        borderRadius:"3px",
        textDecoration:"none",
        fontSize:"0.6em",
        width:"100px",
        textAlign:"center",
        padding:"5px 8px",
        cursor:"pointer"
    },
    pill:{
        backgroundColor:"#1d1917",
        color:"#FBFAF9"
        
    },
    active:{
        color:"#1d1917",
        backgroundImage: "linear-gradient(to right,#ebd805,#eee154 )",
 
        
    },

    default:{
        color: "#6c757d",  // A muted grey, commonly used for disabled elements
        backgroundImage: "linear-gradient(to right, #ccc, #ddd)",  // Muted gradient
     
        cursor: "not-allowed",  // Change cursor to indicate non-interactive element
        opacity: 0.65  // Reduce opacity to enhance the disabled look
        
    },
}
export default ScheduleTime