import { useEffect, useState,useRef } from "react";
import { Grid, Typography, Box, IconButton, Button, Tooltip, styled, tooltipClasses, TooltipProps } from "@mui/material";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useUser } from "../contexts/UserContext";

import { MenteeDataType, MentorSessionDataType } from "../types/DataTypes";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat); // Enable custom format parsing

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 320,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    padding: theme.spacing(2)
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#f5f5f9'
  }
}));

interface ScheduledSession {
  startTime: string;
  endTime: string;
  menteeId: string;
  fullname: string;
  username: string;
  role: {
    type: string;
  };
  bio: string;
  profile_photo_path: string;
  previousSession: string | null;
  currentSessionNumber: number;
  maxSessionNumber: number;
}

interface BlockedTime {
  date: string;
  startTime: string;
  endTime: string;
}

interface BlockedTimeSubmission {
  user_id: string;
  schedule: {
    date: string;
    timeSlots: {
      startTime: string;
      endTime: string;
    }[];
  }[];
}

const HOURS = {
  start: 5, // 5:00 AM
  end: 23 // 11:00 PM
};

const generateTimeSlots = () => {
  const times: string[] = [];
  for(let hour = HOURS.start; hour <= HOURS.end; hour++) {
    times.push(dayjs().hour(hour).startOf('hour').format('h:mm A'));
  }
  return times;
}

const WorkHoursList = ({ 
  selectedDate,
  scheduledSessions,
  blockedTimes,
  onTimeBlockSelect,
  isDragging,
  setIsDragging,
  onSubmitBlockedTimes
}: {
  selectedDate: dayjs.Dayjs,
  scheduledSessions: ScheduledSession[],
  blockedTimes: BlockedTime[],
  onTimeBlockSelect: (start: string, end: string, dayIndices: number[], remove?: boolean) => void,
  isDragging: boolean,
  setIsDragging: (dragging: boolean) => void,
  onSubmitBlockedTimes: () => void
}) => {
  const [times] = useState<string[]>(generateTimeSlots());
  const [selectedStartTime, setSelectedStartTime] = useState<{time: string, dayIndex: number} | null>(null);
  const [selectedTimeBlocks, setSelectedTimeBlocks] = useState<{
    startTime: string,
    endTime: string,
    dayIndices: number[]
  }[]>([]);
  const [mouseDownTimer, setMouseDownTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentEndTime, setCurrentEndTime] = useState<string | null>(null);
  const [userIntialSchedule,setUserIntialSchedule] = useState<{
    startTime: string,
    endTime: string,
    dayIndices: number[]
  }[]>([]);
  const { user } = useUser();


  useEffect(() => {
   const intialSchedule = user?.schedule.map((schedule: Record<string, any>) => {

      const start = schedule.date_time.start_time;
      const end = schedule.date_time.end_time;

      const startTime = dayjs(`${schedule.date} ${start}`,'YYYY-MM-DD HH:MM:SS').format('h:mm A');
      const endTime = dayjs(`${schedule.date} ${end}`,'YYYY-MM-DD HH:MM:SS').format('h:mm A');
      const dayIndex = dayjs(schedule.date).day();

      return {
        startTime,
        endTime,
        dayIndices: [dayIndex]
      }
    });


    
    setUserIntialSchedule(intialSchedule);
  },[user?.schedule])

  useEffect(() => {
    setSelectedTimeBlocks(userIntialSchedule);
  },[userIntialSchedule])



  useEffect(() => {
    // Convert blockedTimes to selectedTimeBlocks format when date changes
    const newSelectedBlocks = blockedTimes.map(block => ({
      startTime: block.startTime,
      endTime: block.endTime,
      dayIndices: [dayjs(block.date).day()]
    }));
    setSelectedTimeBlocks(newSelectedBlocks);
  }, [blockedTimes]);

  const isTimeBlocked = (time: string, dayIndex: number) => {
    return scheduledSessions.some(s => {
      const sessionDay = dayjs(s.startTime).day();
      const sessionStartTime = dayjs(s.startTime).format('h:mm A');
      const sessionEndTime = dayjs(s.endTime).format('h:mm A');
      return dayIndex === sessionDay && 
             times.indexOf(time) >= times.indexOf(sessionStartTime) &&
             times.indexOf(time) < times.indexOf(sessionEndTime);
    });
  };

  const isPastDate = (dayIndex: number) => {
    const date = selectedDate.startOf('week').add(dayIndex, 'day');
    return date.isSameOrBefore(dayjs(), 'day');
  };

  const handleMouseDown = (time: string, dayIndex: number) => {
    if (isTimeBlocked(time, dayIndex) || isPastDate(dayIndex)) return;
    
    // Check if time is already blocked
    const existingBlock = selectedTimeBlocks.find(block => {
      const timeIndex = times.indexOf(time);
      const blockStartIndex = times.indexOf(block.startTime);
      const blockEndIndex = times.indexOf(block.endTime);
      return block.dayIndices.includes(dayIndex) && 
             timeIndex >= blockStartIndex && 
             timeIndex < blockEndIndex;
    });

    if (existingBlock) {
      // Split the existing block
      const timeIndex = times.indexOf(time);
      const nextTimeIndex = timeIndex + 1;
      
      // Remove the existing block
      const otherBlocks = selectedTimeBlocks.filter(b => b !== existingBlock);
      
      // Create two new blocks if needed
      if (times.indexOf(existingBlock.startTime) < timeIndex) {
        const firstBlock = {
          startTime: existingBlock.startTime,
          endTime: time,
          dayIndices: [dayIndex]
        };
        otherBlocks.push(firstBlock);
        onTimeBlockSelect(firstBlock.startTime, firstBlock.endTime, [dayIndex]);
      }
      
      if (times.indexOf(existingBlock.endTime) > nextTimeIndex) {
        const secondBlock = {
          startTime: times[nextTimeIndex],
          endTime: existingBlock.endTime,
          dayIndices: [dayIndex]
        };
        otherBlocks.push(secondBlock);
        onTimeBlockSelect(secondBlock.startTime, secondBlock.endTime, [dayIndex]);
      }
      
      setSelectedTimeBlocks(otherBlocks);
      
      // Remove the original block
      onTimeBlockSelect(existingBlock.startTime, existingBlock.endTime, [dayIndex], true);
      
      return;
    }

    setSelectedStartTime({time, dayIndex});
    setIsDragging(true);
    setCurrentEndTime(time);
  };

  const handleMouseMove = (time: string, dayIndex: number) => {
    if (!isDragging || !selectedStartTime || selectedStartTime.dayIndex !== dayIndex || isPastDate(dayIndex)) return;
    
    const startTimeIndex = times.indexOf(selectedStartTime.time);
    const currentTimeIndex = times.indexOf(time);

    // Only allow downward selection
    if (currentTimeIndex < startTimeIndex) return;

    // Find the first blocked time after the start time
    let maxAllowedIndex = currentTimeIndex;
    let foundBlocked = false;
    for (let i = startTimeIndex; i <= currentTimeIndex; i++) {
      if (isTimeBlocked(times[i], dayIndex)) {
        maxAllowedIndex = i - 1;
        foundBlocked = true;
        break;
      }
    }

    if (foundBlocked) {
      // If we hit a blocked time, commit the current selection
      const finalEndTime = times[maxAllowedIndex + 1] || times[maxAllowedIndex];
      onTimeBlockSelect(
        selectedStartTime.time,
        finalEndTime,
        [selectedStartTime.dayIndex]
      );
      setIsDragging(false);
      setSelectedStartTime(null);
      setCurrentEndTime(null);
      return;
    }
    
    // Update current end time while dragging
    setCurrentEndTime(times[maxAllowedIndex]);

    // Update temporary selection
    const newBlock = {
      startTime: selectedStartTime.time,
      endTime: times[maxAllowedIndex + 1],
      dayIndices: [dayIndex]
    };

    // Keep existing blocks for the same day that don't overlap
    const existingBlocksForDay = selectedTimeBlocks.filter(b => 
      b.dayIndices.includes(dayIndex) &&
      (times.indexOf(b.endTime) <= times.indexOf(newBlock.startTime) ||
       times.indexOf(b.startTime) >= times.indexOf(newBlock.endTime))
    );

    const otherDayBlocks = selectedTimeBlocks.filter(b => !b.dayIndices.includes(dayIndex));
    
    setSelectedTimeBlocks([...otherDayBlocks, ...existingBlocksForDay, newBlock]);
  };

  const handleMouseUp = () => {
    if (!selectedStartTime || !currentEndTime) return;

    const endTimeIndex = times.indexOf(currentEndTime);
    const startTimeIndex = times.indexOf(selectedStartTime.time);

    // Only commit if dragging downward
    if (endTimeIndex >= startTimeIndex) {
      const finalEndTime = times[endTimeIndex + 1] || times[endTimeIndex];
      const dayIndex = selectedStartTime.dayIndex;

      // Get existing non-overlapping blocks for the same day
      const existingBlocksForDay = selectedTimeBlocks.filter(b => 
        b.dayIndices.includes(dayIndex) &&
        (times.indexOf(b.endTime) <= times.indexOf(selectedStartTime.time) ||
         times.indexOf(b.startTime) >= times.indexOf(finalEndTime))
      );

      // Add the new block
      const newBlock = {
        startTime: selectedStartTime.time,
        endTime: finalEndTime,
        dayIndices: [dayIndex]
      };

      // Commit all blocks for this day
      [...existingBlocksForDay, newBlock].forEach(block => {
        onTimeBlockSelect(
          block.startTime,
          block.endTime,
          [dayIndex]
        );
      });
    }

    setIsDragging(false);
    setSelectedStartTime(null);
    setCurrentEndTime(null);
  };

  const isTimeBlockSelected = (time: string, dayIndex: number) => {
    return selectedTimeBlocks.some(block => 
      block.dayIndices.includes(dayIndex) &&
      times.indexOf(time) >= times.indexOf(block.startTime) &&
      times.indexOf(time) < times.indexOf(block.endTime)
    );
  };

  const isCurrentlySelecting = (time: string, dayIndex: number) => {
    if (!selectedStartTime || selectedStartTime.dayIndex !== dayIndex || !currentEndTime) return false;
    
    const timeIndex = times.indexOf(time);
    const startIndex = times.indexOf(selectedStartTime.time);
    const endIndex = times.indexOf(currentEndTime);
    
    return timeIndex >= startIndex && timeIndex <= endIndex;
  };

  const getSessionBackgroundColor = (session: ScheduledSession) => {
    if (!session.previousSession) {
        return '#b9f2ff';
    }
    if (session.currentSessionNumber === session.maxSessionNumber) {
        return '#ffb6c1'
     
    }
    return '#ffdab9';
   
  };

  const getSessionStatusText = (session: ScheduledSession) => {
    if (session.currentSessionNumber === 1) {
      return {
        text: 'New Mentee',
        color: '#1d1917',
        backgroundColor: '#b9f2ff'
      };
    }
    if (session.currentSessionNumber === session.maxSessionNumber) {
      return {
        text: 'Last Session',
        color: '#1d1917',
        backgroundColor: '#ffb6c1'
      };
    }
    return {
      text: 'Sessions in Progress',
      color: '#1d1917',
      backgroundColor: '#ffe4b5'
    };
  };

  return (
    <>
      <Grid container sx={{ px: 4 }}>
        {times.map((time, index) => (
          <Grid item xs={12} key={index}>
            <Grid container spacing={0}>
              <Grid item xs={1}>
                <Typography sx={{fontSize:'0.7em', textAlign:'right', paddingRight:'1em', mt: 0.5}} variant="body1">
                  {time}
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Grid container>
                  {[...Array(7)].map((_, dayIndex) => {
                    const currentDate = selectedDate.startOf('week').add(dayIndex, 'day');
                    const session = scheduledSessions.find(s => 
                      dayjs(s.startTime).isSame(currentDate, 'day') && 
                      dayjs(s.startTime).format('h:mm A') === time
                    );

                    const isHighlighted = isTimeBlockSelected(time, dayIndex) || isCurrentlySelecting(time, dayIndex);
                    const isPast = isPastDate(dayIndex);

                    const showBlockedTimeLabel = selectedTimeBlocks.some(block => 
                      block.dayIndices.includes(dayIndex) && 
                      time === block.startTime
                    );
                    
                    // Get all blocks that start at this time for this day
                    const blocksStartingAtTime = selectedTimeBlocks.filter(block => 
                      block.dayIndices.includes(dayIndex) && 
                      time === block.startTime
                    );
                    
                    return (
                      <Grid 
                        item 
                        key={dayIndex} 
                        xs
                        onMouseDown={() => handleMouseDown(time, dayIndex)}
                        onMouseMove={() => handleMouseMove(time, dayIndex)}
                        onMouseUp={handleMouseUp}
                        sx={{
                          position: 'relative',
                          borderLeft: isHighlighted ? 'none' : '1px solid #e0e0e0',
                          borderBottom: isHighlighted ? 'none' : '1px solid #e0e0e0',
                          height: '70px',
                          backgroundColor: isPast ? '#f5f5f5' : (session ? getSessionBackgroundColor(session) : 'white'),
                          cursor: isPast || session ? 'not-allowed' : 'pointer',
                          opacity: isPast ? 0.7 : 1,
                          '&:hover': {
                            backgroundColor: isPast ? '#f5f5f5' : (session ? getSessionBackgroundColor(session) : '#f5f5f5')
                          }
                        }}
                      >
                        {isHighlighted && !isPast && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: '#f2c85b',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                              zIndex: 1
                            }}
                          />
                        )}
                        {blocksStartingAtTime.map((block, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              zIndex: 2,
                              textAlign: 'center',
                              color: '#1d1917'
                            }}
                          >
                            <Typography variant="caption" display="block">
                              Blocked off time
                            </Typography>
                            <Typography variant="caption" display="block">
                              {block.startTime} - {block.endTime}
                            </Typography>
                          </Box>
                        ))}
                        {session && (
                          <CustomTooltip
                            title={
                              <Box>
                                <Box sx={{ position: 'relative', width: 'fit-content', margin: '0 auto' }}>
                                  <img 
                                    src={session.profile_photo_path}
                                    alt={session.fullname}
                                    style={{
                                      width: 80,
                                      height: 80,
                                      borderRadius: '50%',
                                      objectFit: 'cover',
                                      border: `3px solid #fd2f30`,
                                      transform: 'translate(4px, 4px)'
                                    }}
                                  />
                                </Box>
                                <Typography variant="subtitle1">{session.fullname}</Typography>
                                <Typography variant="body2">@{session.username}</Typography>
                                <Typography variant="body2">{session.role.type}</Typography>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    display: 'inline-block',
                                    backgroundColor: getSessionStatusText(session).backgroundColor,
                                    color: getSessionStatusText(session).color,
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    marginTop: 1,
                                    marginBottom: 1
                                  }}
                                >
                                  {getSessionStatusText(session).text}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  {session.bio?.length > 100 ? `${session.bio.substring(0, 100)}...` : session.bio}
                                </Typography>
                                <Button 
                                  variant="text" 
                                  size="small" 
                                  href={`/profile/${session.role.type}/${session.menteeId}`}
                                  sx={{ mt: 1, color: 'black', textDecoration: 'underline' }}
                                >
                                  View Profile
                                </Button>
                              </Box>
                            }
                            arrow
                            placement="top"
                          >
                            <Box sx={{p: 1, position: 'relative', zIndex: 2}}>
                              <img 
                                src={session.profile_photo_path}
                                alt={session.fullname}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: '50%',
                                  objectFit: 'cover'
                                }}
                              />
                              <Typography variant="caption" display="block">
                                {session.fullname}
                              </Typography>
                            </Box>
                          </CustomTooltip>
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 4, mr: 6 }}>
        <Button 
          variant="contained"
          onClick={onSubmitBlockedTimes}
          disabled={selectedTimeBlocks.length === 0}
          sx={{
            px: '10px',
            py: '8px',
            borderRadius: 2,
            fontSize: '1.1rem',
            textTransform: 'none',
            fontWeight: 'normal',
            backgroundColor: '#000000',
            '&:hover': {
              backgroundColor: '#333333'
            }
          }}
        >
          Set Schedule
        </Button>
      </Box>
    </>
  );
};

const DaysOfWeek = ({ currentDate }: { currentDate: dayjs.Dayjs }) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const today = dayjs();
  
  return (
    <Grid container spacing={2} sx={{ px: 4 }}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
          {currentDate.format('MMMM YYYY')}
        </Typography>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={11}>
        <Grid container>
          {[...Array(7)].map((_, index) => {
            const date = currentDate.startOf('week').add(index, 'day');
            const isToday = date.format('YYYY-MM-DD') === today.format('YYYY-MM-DD');
            const isPast = date.isSameOrBefore(today, 'day');
            
            return (
              <Grid item key={index} xs>
                <Typography 
                  sx={{ 
                    fontSize: "1.2em", 
                    textAlign: 'center',
                    opacity: isPast ? 0.7 : 1 
                  }} 
                  variant="body1"
                >
                  {days[index]}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isToday ? '#e0e0e0' : 'transparent',
                    margin: '0 auto',
                    opacity: isPast ? 0.7 : 1
                  }}
                >
                  {date.format('D')}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

const Calendar = () => {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(dayjs().startOf('week'));
  const [scheduledSessions, setScheduledSessions] = useState<ScheduledSession[]>([]);
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submissionData,setSubmissionData] = 
  useState<BlockedTimeSubmission | null>(null);
 
 

  useEffect(() => {
    if(!submissionData) return;
    const submitData = async () => {
      try {
        const response = await fetch('https://shield.igotnext.local/api/schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({data:submissionData})
        });
        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
        console.log('Data submitted successfully');
      } catch (error) {
        console.error(error);
      }
    }

    submitData();
  }, [submissionData]);

  // Add validation for date range
  const isDateWithinRange = (date: dayjs.Dayjs) => {
    const currentWeek = dayjs().startOf('week');
    const twoMonthsFromNow = dayjs().add(2, 'month');
    return date.isSameOrAfter(currentWeek) && date.isBefore(twoMonthsFromNow);
  };

  useEffect(() => {
    // Simulate some scheduled sessions with the provided images
    const mockSessions: ScheduledSession[] = [
      {
        startTime: dayjs().startOf('week').add(6, 'day').hour(10).format(),
        endTime: dayjs().startOf('week').add(6, 'day').hour(11).format(),
        menteeId: '1',
        fullname: 'Michael B. Jordan',
        username: 'michaelbjordan',
        role: {
          type: 'Actor/Producer'
        },
        bio: 'Award-winning actor known for roles in Black Panther, Creed, and Without Remorse. Also venturing into producing with projects that promote diversity and inclusion in Hollywood...',
        profile_photo_path: 'https://www.mensjournal.com/.image/t_share/MTk5MzM0MzQyNDI4NzMxMzQy/michael-b.jpg',
        previousSession: null, // First session
        currentSessionNumber: 1,
        maxSessionNumber: 5
      },
      {
        startTime: dayjs().startOf('week').add(5, 'day').hour(14).format(),
        endTime: dayjs().startOf('week').add(5, 'day').hour(15).format(),
        menteeId: '2',
        fullname: 'Emma Watson',
        username: 'emmawatson',
        role: {
          type: 'Actress/Activist'
        },
        bio: 'British actress and activist. UN Women Goodwill Ambassador. Known for her role as Hermione Granger in Harry Potter series and advocacy for gender equality...',
        profile_photo_path: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSojrcPyhp6yuWenklu_PPD4Bz2Le-UNHxxv4JJlmTVHPfKeWL5eUDjP5neMZ9LMvvTHoO91-XJ09zUPj5aqw4wxg',
        previousSession: '2023-10-15',
        currentSessionNumber: 3,
        maxSessionNumber: 5
      },
      {
        startTime: dayjs().startOf('week').add(4, 'day').hour(16).format(),
        endTime: dayjs().startOf('week').add(4, 'day').hour(17).format(),
        menteeId: '3',
        fullname: 'Michael B. Jordan',
        username: 'michaelbjordan',
        role: {
          type: 'Actor/Producer'
        },
        bio: 'Award-winning actor known for roles in Black Panther, Creed, and Without Remorse. Also venturing into producing with projects that promote diversity and inclusion in Hollywood...',
        profile_photo_path: 'https://www.mensjournal.com/.image/t_share/MTk5MzM0MzQyNDI4NzMxMzQy/michael-b.jpg',
        previousSession: '2023-10-20',
        currentSessionNumber: 5,
        maxSessionNumber: 5 // Final session
      },
      {
        startTime: dayjs().startOf('week').add(4, 'day').hour(13).format(),
        endTime: dayjs().startOf('week').add(4, 'day').hour(14).format(),
        menteeId: '4',
        fullname: 'Tom Holland',
        username: 'tomholland',
        role: {
          type: 'Actor'
        },
        bio: 'Known for playing Spider-Man in the Marvel Cinematic Universe. Rising star in Hollywood with a background in theater and dance...',
        profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/1200px-Tom_Holland_by_Gage_Skidmore.jpg',
        previousSession: null, // First session
        currentSessionNumber: 1,
        maxSessionNumber: 3
      },
      {
        startTime: dayjs().startOf('week').add(5, 'day').hour(11).format(),
        endTime: dayjs().startOf('week').add(5, 'day').hour(12).format(),
        menteeId: '5',
        fullname: 'Zendaya',
        username: 'zendaya',
        role: {
          type: 'Actress/Producer'
        },
        bio: 'Emmy Award-winning actress known for Euphoria and Spider-Man. Fashion icon and advocate for diversity in entertainment...',
        profile_photo_path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Zendaya_-_2019_by_Glenn_Francis.jpg/1200px-Zendaya_-_2019_by_Glenn_Francis.jpg',
        previousSession: '2023-10-18',
        currentSessionNumber: 3,
        maxSessionNumber: 3 // Final session
      }
    ];
    let mentor_confirmed_sessions:ScheduledSession[] =  [];

    user?.mentees.forEach((mentee:MenteeDataType) => {
 
      const {fullname,username,bio,profile_photo_path} = mentee;
      mentee.mentorSession?.forEach((session: MentorSessionDataType) => {
        if(session.status !=='confirmed') return;
        const mentor_scheduled_sessions ={
          fullname,
          username,
          profile_photo_path,
          menteeId: mentee.id,
          bio,
          role: {type:'artist'},
          previousSession: dayjs(session.previousSession).format('YYYY-MM-DD'),
          startTime: dayjs(session.start_time).local().format('YYYY-MM-DDTHH:mm:ssZ'),
          endTime: dayjs(session.end_time).local().format('YYYY-MM-DDTHH:mm:ssZ'),
          currentSessionNumber: session.currentSessionNumber,
          maxSessionNumber: session.maxSessionNumber
        }

        mentor_confirmed_sessions.push(mentor_scheduled_sessions as ScheduledSession);

      });
  

        console.log(`the scheduled sessions are ${JSON.stringify(mentor_confirmed_sessions,null,2)}`)

        console.log(`mocked sessions are ${JSON.stringify(mockSessions,null,2)}`)
    })
    setScheduledSessions(mentor_confirmed_sessions);
  }, [currentDate]);

  const handlePrevWeek = () => {
    const newDate = currentDate.subtract(7, 'day');
    if (isDateWithinRange(newDate)) {
      setCurrentDate(newDate);
    }
  };

  const handleNextWeek = () => {
    const newDate = currentDate.add(7, 'day');
    if (isDateWithinRange(newDate)) {
      setCurrentDate(newDate);
    }
  };

  const handleTimeBlockSelect = (start: string, end: string, dayIndices: number[], remove?: boolean) => {
    if (remove) {
      setBlockedTimes(prev => prev.filter(block => 
        !dayIndices.some(dayIndex => 
          block.date === currentDate.startOf('week').add(dayIndex, 'day').format('YYYY-MM-DD') &&
          block.startTime === start &&
          block.endTime === end
        )
      ));
      return;
    }

    const newBlocks = dayIndices.map(dayIndex => {
      const selectedDate = currentDate.startOf('week').add(dayIndex, 'day');
      return {
        date: selectedDate.format('YYYY-MM-DD'),
        startTime: start,
        endTime: end
      };
    });
    
    setBlockedTimes(prev => [...prev, ...newBlocks]);
  };

  const handleSubmitBlockedTimes = () => {
    // Group blocked times by date
    const groupedByDate = blockedTimes.reduce((acc, block) => {
      if (!acc[block.date]) {
        acc[block.date] = [];
      }

      acc[block.date].push({
        startTime: dayjs(block.startTime, 'h:mm A').format('HH:mm:ss'),
        endTime: dayjs(block.endTime, 'h:mm A').format('HH:mm:ss')
      });
      return acc;
    }, {} as Record<string, {startTime: string; endTime: string; }[]>);

    // Format data for submission
    const submissionData: BlockedTimeSubmission = {
      user_id: user?.id || '', // This should come from your auth context or props
      schedule: Object.entries(groupedByDate).map(([date, timeSlots]) => ({
        date,
        timeSlots
      }))
    };

    setSubmissionData(submissionData);
    // Here you would typically make an API call to submit the data
    console.log('Submitting blocked times:', submissionData);


    // Clear the blocked times after submission
    setBlockedTimes([]);
  };

  const canGoPrev = isDateWithinRange(currentDate.subtract(7, 'day'));
  const canGoNext = isDateWithinRange(currentDate.add(7, 'day'));

  return (
    <>
      <Box sx={{ 
        maxWidth: "3000px", 
        margin: "5em auto", 
        textAlign:'center',
        boxShadow:'0px 0px 5px 0px rgba(0,0,0,0.2)', 
        padding:'2em 0', 
        borderRadius:'10px'
      }}>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item>
            {canGoPrev && (
              <IconButton onClick={handlePrevWeek}>
                <ChevronLeft />
              </IconButton>
            )}
          </Grid>
          <Grid item xs>
            <DaysOfWeek currentDate={currentDate} />
          </Grid>
          <Grid item>
            {canGoNext && (
              <IconButton onClick={handleNextWeek}>
                <ChevronRight />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Box>

      <WorkHoursList 
        selectedDate={currentDate}
        scheduledSessions={scheduledSessions}
        blockedTimes={blockedTimes}
        onTimeBlockSelect={handleTimeBlockSelect}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        onSubmitBlockedTimes={handleSubmitBlockedTimes}
      />
    </>
  );
};


export default Calendar;