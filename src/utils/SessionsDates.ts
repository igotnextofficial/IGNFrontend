import {MenteeDataType} from '../types/DataTypes'


import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);



export const formatDate = (date: Date | string) => {
    const userTimezone = dayjs.tz.guess();
  
    // Fallback to UTC if guessing fails
    const safeTimezone = userTimezone || 'UTC';
  
    return dayjs(date)
      .tz(safeTimezone)
      .format('dddd MMM D [@] hh:mm A z');
  };
export const getUpcomingSessionWithinMax = (mentee:MenteeDataType,max:number):MenteeDataType | null => { // export this function
    const today = dayjs()
    const maximumDate = dayjs().add(max,'day')
    const upcomingSession = dayjs(mentee.session_date);
    // console.log(`Today is ${today} and the upcoming session is ${upcomingSession} and the maximum date is ${maximumDate}`)
    if( ((upcomingSession < today) || (upcomingSession > maximumDate)) ){return null}
    const readableDate = formatDate(new Date(mentee.session_date));
        let updatedDate = {session_date:readableDate}
        let updateData = {...mentee,...updatedDate}


        return updateData;
  }