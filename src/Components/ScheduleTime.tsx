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
 

interface AvailableTimeDisplayProps {
    chosenDate:string;
    chosenTime:string;
    currentTime:string;
    mentorSchedule: Map<string, string[]>;
    handleTime: (time: string, available: boolean) => void;
}

const AvailableTimesDisplay: React.FC<AvailableTimeDisplayProps> = ({
    chosenDate,
    chosenTime,
    currentTime,
    mentorSchedule,
    handleTime
}) => {
    const [currentStyle,setCurrentStyle] = useState({})
    const [isAvailable,setIsAvailable] = useState(true)
    useEffect(() => {
        if(!mentorSchedule.has(chosenDate)){
           setCurrentStyle(styles.pill)
        
        }
        else{
            let mentorBookedTimes = mentorSchedule.get(chosenDate) || [];
            if(mentorBookedTimes.includes(chosenTime)){
                setCurrentStyle(styles.default);
                setIsAvailable(false)
            }
            else if(chosenTime === currentTime) {
                setCurrentStyle(styles.active)
            }
            else{
                setCurrentStyle(styles.pill)
            }
        }
 
    },[chosenDate,chosenTime,currentTime])
 
    return (
        <>
            <Button onClick={() => {handleTime(currentTime,isAvailable)}}>
            <Box sx={[styles.timePill,currentStyle]}>
            <Typography variant='subtitle1'> {currentTime} </Typography>
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
    const [mentorScheduledTimes,setMentorScheduledTimes] = useState<Map<string,string[]>>(new Map())
    const [scheduledSuccessfully,setScheduledSuccessfully] = useState<boolean>(false)
    const [allTime,setAllTime] = useState<string[]>([])
    const tomorrow = dayjs().add(1,'day');
    const maxDate = tomorrow.add(14,'day');

    useEffect(() => {
        setMentor(user?.mentor);
    },[user]);

    // set all possible times
    useEffect(() => {
        let scheduledTimes = new Set();
        let startTime = dayjs("05:00:00 AM","HH:mm:ss A");
        let endTime = dayjs("11:59:00 PM","HH:mm:ss A");
        
        while(startTime.isBefore(endTime)){
            scheduledTimes.add(startTime.format('h:mm A'));
            startTime = startTime.add(60,'minute');
        }
        let times = [ ...Array.from(scheduledTimes) ]
        setAllTime(times as string [])
     },[])
     
     useEffect(() => { // set the mentors schedule of available times
        if(!mentor){ return }
        
        const mentorScheduleRecord = new Map<string, string[]>();
        const mentorSchedule = mentor.schedule || [];
        
        mentorSchedule.forEach((schedule: Record<string, any>) => {
            const date = schedule.date;
            let currentStartTime = dayjs(`${date} ${schedule.date_time.start_time}`, "YYYY-MM-DD HH:mm:ss");
            const currentEndTime = dayjs(`${date} ${schedule.date_time.end_time}`, "YYYY-MM-DD HH:mm:ss");const timeInterval: string[] = [];
            
            while (currentStartTime.isBefore(currentEndTime)) {
                timeInterval.push(currentStartTime.format('h:mm A'));
                currentStartTime = currentStartTime.add(1, 'hour');
            }
            
            if (mentorScheduleRecord.has(date)) {
                const existingTimes = mentorScheduleRecord.get(date) || [];
                mentorScheduleRecord.set(date, [...existingTimes, ...timeInterval]);
            } 
            else {
                mentorScheduleRecord.set(date, timeInterval);
            }
        });
        
        setMentorScheduledTimes(mentorScheduleRecord);
    
        
    },[mentor])

    const scheduleDate = async() => {
        let data = {
          session_date:`${schedule} ${chosenTime}`,
          mentee_id: user?.id,
          mentee:{fullname:user?.fullname,email:user?.email},
          mentor_id: user?.mentor.id,
          mentor:{fullname:user?.mentor.fullname,email:user?.mentor.email,schedule:user?.mentor.schedule},
          start_time:dayjs(`${schedule} ${chosenTime}`,"MM/DD/YYYY h:mm A").toISOString(),
          end_time: dayjs(`${schedule} ${chosenTime}`,"MM/DD/YYYY h:mm A").add(1,'hour').toISOString()
        }
        
        if(schedule && chosenTime){
            let currentuser = user as MenteeDataType
            const headers = { Authorization: `Bearer ${accessToken}` }
                let url = APP_ENDPOINTS.SESSIONS.BASE;
                let response = await sendRequest(HttpMethods.POST,url,{data},headers)
                if(response){
                    setScheduledSuccessfully(true)
                }
        }
    }
    
    const handleTimeChange = (value:string,available:boolean) => {
        if(!available) return;
        setChosenTime(value)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={dayjs(schedule)} onChange={(value) => { 
                if(value){ setSchedule(value?.format('MM/DD/YYYY')) }
                }}
                minDate={tomorrow}
                maxDate={maxDate}
            />
            
            <Grid container>
            { 
                allTime.map((currentTime) => { 
                    return <>
                        <Grid item xs={4}>
                        <AvailableTimesDisplay currentTime={currentTime} chosenDate={schedule || ""} chosenTime={chosenTime} handleTime={handleTimeChange} mentorSchedule={ mentorScheduledTimes}/>
                        </Grid> 
                    </>
                    
                })
            }
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