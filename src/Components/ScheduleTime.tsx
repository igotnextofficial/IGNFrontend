import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { 
  Button, 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Container, 
  Divider, 
  CircularProgress,
  Alert,
  Stack,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Link
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { sendRequest } from '../utils/helpers';
import { HttpMethods, MenteeDataType } from '../types/DataTypes';
import { useUser } from '../contexts/UserContext';
import { APP_ENDPOINTS } from '../config/app';
import CircularImage from '../utils/CircularImage';
import { Link as RouterLink } from 'react-router-dom';
import useHttp from '../customhooks/useHttp';
import { useSocket } from '../customhooks/useSocket';



interface AvailableTimeDisplayProps {
    chosenDate: string;
    chosenTime: string;
    currentTime: string;
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
    const [currentStyle, setCurrentStyle] = useState({});
    const [isAvailable, setIsAvailable] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    useEffect(() => {
        if(!mentorSchedule.has(chosenDate)){
           setCurrentStyle(styles.pill);
        } else {
            let mentorBookedTimes = mentorSchedule.get(chosenDate) || [];
            if(mentorBookedTimes.includes(currentTime)){
                setCurrentStyle(styles.default);
                setIsAvailable(false);
            } else if(chosenTime === currentTime) {
                setCurrentStyle(styles.active);
            } else {
                setCurrentStyle(styles.pill);
            }
        }
    }, [chosenDate, chosenTime, currentTime, mentorSchedule]);
 
    return (
        <Button 
            onClick={() => {handleTime(currentTime, isAvailable)}}
            disabled={!isAvailable}
            sx={{ 
                p: 0, 
                minWidth: isMobile ? '80px' : '100px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: isAvailable ? 'translateY(-2px)' : 'none',
                    boxShadow: isAvailable ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
                }
            }}
        >
            <Box sx={[styles.timePill, currentStyle]}>
                <Typography variant='subtitle2' sx={{ fontWeight: 'medium' }}>
                    {currentTime}
                </Typography>
            </Box>
        </Button>
    );
}


const ScheduleTime = ({productPayment}:{productPayment:string}) => {
    const { user, accessToken } = useUser();
    const [mentor, setMentor] = useState<MenteeDataType | null>(null);
    const [schedule, setSchedule] = useState<string | null>(null);
    const [chosenTime, setChosenTime] = useState<string>(""); 
    const [mentorScheduledTimes, setMentorScheduledTimes] = useState<Map<string,string[]>>(new Map());
    const [scheduledSuccessfully, setScheduledSuccessfully] = useState<boolean>(false);
    const [allTime, setAllTime] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const tomorrow = dayjs().add(1,'day');
    const maxDate = tomorrow.add(14,'day');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { put } = useHttp(accessToken)
    const { socket } = useSocket({ user }); 
    useEffect(() => {
        setMentor(user?.mentor);
    }, [user]);

    // set all possible times
    useEffect(() => {
        let scheduledTimes = new Set();
        let startTime = dayjs("05:00:00 AM","HH:mm:ss A");
        let endTime = dayjs("11:59:00 PM","HH:mm:ss A");
        
        while(startTime.isBefore(endTime)){
            scheduledTimes.add(startTime.format('h:mm A'));
            startTime = startTime.add(60,'minute');
        }
        let times = [ ...Array.from(scheduledTimes) ];
        setAllTime(times as string[]);
    }, []);
     
    useEffect(() => { // set the mentors schedule of available times
        if(!mentor){ return; }
        
        const mentorScheduleRecord = new Map<string, string[]>();
        const mentorSchedule = mentor.schedule || [];
        
        mentorSchedule.forEach((schedule: Record<string, any>) => {
            const date = schedule.date;
            let currentStartTime = dayjs(`${date} ${schedule.date_time.start_time}`, "YYYY-MM-DD HH:mm:ss");
            const currentEndTime = dayjs(`${date} ${schedule.date_time.end_time}`, "YYYY-MM-DD HH:mm:ss");
            const timeInterval: string[] = [];
            
            while (currentStartTime.isBefore(currentEndTime)) {
                timeInterval.push(currentStartTime.format('h:mm A'));
                currentStartTime = currentStartTime.add(1, 'hour');
            }
            
            if (mentorScheduleRecord.has(date)) {
                const existingTimes = mentorScheduleRecord.get(date) || [];
                mentorScheduleRecord.set(date, [...existingTimes, ...timeInterval]);
            } else {
                mentorScheduleRecord.set(date, timeInterval);
            }
        });
        
        setMentorScheduledTimes(mentorScheduleRecord);
    }, [mentor]);

    const scheduleDate = async() => {
        if (!schedule || !chosenTime || !user || !user.mentor) {
            setError("Please select both a date and time before scheduling");
            return;
        }
        
        setIsLoading(true);
        setError(null);
        
        try {
            const formattedDateTime = dayjs(`${schedule} ${chosenTime}`, "MM/DD/YYYY h:mm A");
            const startTime = formattedDateTime.toISOString();
            const endTime = formattedDateTime.add(1, 'hour').toISOString();
            
            let data = {
                start_time: startTime,
                end_time: endTime,
                mentee_id: user.id,
                mentee: { fullname: user.fullname, email: user.email },
                mentor_id: user.mentor.id,
                mentor: { 
                    fullname: user.mentor.fullname, 
                    email: user.mentor.email, 
                    schedule: user.mentor.schedule 
                }
            };
            
            const headers = { Authorization: `Bearer ${accessToken}` };
            const url = APP_ENDPOINTS.SESSIONS.BASE;
            const response = await sendRequest(HttpMethods.POST, url, { data }, headers);
            
            if (response) {
                setScheduledSuccessfully(true);
                socket.emit('session:request',data)
                const url = APP_ENDPOINTS.PAYMENT.UPDATE_PRODUCT_PAYMENT_STATUS.replace(':id',productPayment)
                const productPaymentResponse = await put(url,{status:"COMPLETED",payable_id:productPayment})
                if(productPaymentResponse.status === 200){
                    console.log("product payment updated successfully")
                }
                else{
                    console.log("product payment update failed")
                }
            } else {
                setError("Failed to schedule appointment. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while scheduling. Please try again later.");
            console.error("Scheduling error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleTimeChange = (value: string, available: boolean) => {
        if (!available) return;
        setChosenTime(value);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "";
        return dayjs(dateString, "MM/DD/YYYY").format("dddd, MMMM D, YYYY");
    };

    // Get mentor profile image or fallback to default
    const getMentorImage = () => {
        if (user?.mentor?.profile_photo_path) {
            return user.mentor.profile_photo_path;
        }
        return "https://via.placeholder.com/150"; // Fallback image
    };

    return (
        <Container 
            maxWidth="md" 
            sx={{ 
                py: 4, 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100%'
            }}
        >
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    borderRadius: 2, 
                    width: '100%', 
                    maxWidth: '800px',
                    mx: 'auto',
                    my: 4
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    color: '#1d1917',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    <CalendarTodayIcon color="primary" /> Schedule Your Session
                </Typography>
                
                <Divider sx={{ my: 3 }} />
                
                {scheduledSuccessfully ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Alert 
                            icon={<CheckCircleIcon fontSize="large" />}
                            severity="success" 
                            sx={{ 
                                mb: 4, 
                                borderRadius: 2,
                                maxWidth: '600px',
                                mx: 'auto',
                                '& .MuiAlert-message': {
                                    fontSize: '1rem',
                                    fontWeight: 'medium'
                                }
                            }}
                        >
                            Appointment scheduled successfully! You will receive a confirmation email shortly.
                        </Alert>
                        
                        <Button
                            component={RouterLink}
                            to="/dashboard"
                            variant="contained"
                            startIcon={<ArrowBackIcon />}
                            sx={{ 
                                mt: 2,
                                py: 1.5,
                                px: 4,
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                background: 'linear-gradient(135deg, #ff6347 0%, #fd2f30 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #fd2f30 0%, #ff6347 100%)',
                                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                                }
                            }}
                        >
                            Go Back to Dashboard
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ 
                                fontWeight: 'medium',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 2
                            }}>
                                <CalendarTodayIcon fontSize="small" /> Select a Date
                            </Typography>
                            
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    value={dayjs(schedule)} 
                                    onChange={(value) => { 
                                        if(value) { 
                                            setSchedule(value.format('MM/DD/YYYY'));
                                            setChosenTime(""); // Reset time when date changes
                                        }
                                    }}
                                    minDate={tomorrow}
                                    maxDate={maxDate}
                                    sx={{ 
                                        width: '100%',
                                        maxWidth: '400px',
                                        '& .MuiInputBase-root': {
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                        
                        {schedule && (
                            <>
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="subtitle1" gutterBottom sx={{ 
                                        fontWeight: 'medium',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2,
                                        justifyContent: 'center'
                                    }}>
                                        <AccessTimeIcon fontSize="small" /> Select a Time
                                    </Typography>
                                    
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                                        Available times for {formatDate(schedule)}
                                    </Typography>
                                    
                                    <Box sx={{ px: 2 }}>
                                        <Grid container spacing={2} justifyContent="center">
                                            {allTime.map((currentTime, index) => (
                                                <Grid item xs={isMobile ? 4 : 3} sm={3} md={2} key={index}>
                                                    <AvailableTimesDisplay 
                                                        currentTime={currentTime} 
                                                        chosenDate={schedule} 
                                                        chosenTime={chosenTime} 
                                                        handleTime={handleTimeChange} 
                                                        mentorSchedule={mentorScheduledTimes}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Box>
                                
                                {chosenTime && (
                                    <Card sx={{ 
                                        mb: 4, 
                                        borderRadius: 2,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        background: 'linear-gradient(135deg, #f2c85b 0%, #eee154 100%)',
                                        maxWidth: '600px',
                                        mx: 'auto'
                                    }}>
                                        <CardContent>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <CircularImage 
                                                    image={getMentorImage()} 
                                                    size={60} 
                                                />
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1d1917' }}>
                                                        Selected Appointment
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: '#1d1917' }}>
                                                        {formatDate(schedule)} at {chosenTime}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#1d1917', mt: 0.5 }}>
                                                        with {user?.mentor?.fullname || 'your mentor'}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                )}
                                
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                    <Button 
                                        variant="contained" 
                                        onClick={scheduleDate}
                                        disabled={isLoading || !chosenTime || !schedule}
                                        sx={{ 
                                            py: 1.5,
                                            px: 4,
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                            background: 'linear-gradient(135deg, #ff6347 0%, #fd2f30 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #fd2f30 0%, #ff6347 100%)',
                                                boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                                            }
                                        }}
                                    >
                                        {isLoading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            <>Schedule Appointment</>
                                        )}
                                    </Button>
                                </Box>
                            </>
                        )}
                        
                        {error && (
                            <Alert severity="error" sx={{ mt: 3, borderRadius: 2, maxWidth: '600px', mx: 'auto' }}>
                                {error}
                            </Alert>
                        )}
                    </>
                )}
            </Paper>
        </Container>
    );
}


const styles = {
    timePill: {
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "0.875rem",
        width: "100%",
        textAlign: "center",
        padding: "10px 12px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "40px"
    },
    pill: {
        backgroundColor: "#1d1917",
        color: "#FBFAF9",
        "&:hover": {
            backgroundColor: "#2a2422"
        }
    },
    active: {
        color: "#1d1917",
        backgroundImage: "linear-gradient(to right, #ebd805, #eee154)",
        fontWeight: "bold",
        boxShadow: "0 2px 8px rgba(235, 216, 5, 0.4)"
    },
    default: {
        color: "#6c757d",
        backgroundImage: "linear-gradient(to right, #ccc, #ddd)",
        cursor: "not-allowed",
        opacity: 0.65
    }
};

export default ScheduleTime;