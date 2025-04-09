import * as React from 'react';


import {MenteeDataType, MentorSessionDataType } from '../types/DataTypes';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar } from "@mui/material"


import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';


export default function  ListContentComponent({user,session} : {user:MenteeDataType,session: MentorSessionDataType}) {
  return (
      <>
      <Link  to={`/profile/artist/${user?.id}`}>

      <List sx={{width: '100%'}}>
      <ListItem sx={styles.nameHolder}>
        <ListItemAvatar>
          <Avatar>
            <ScheduleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${user.fullname}`} secondary={`${dayjs(session.start_time).format('dddd MMM D [@] hh:mm A')}`} />
      </ListItem>
       
        </List> 
        
        </Link>
      </>
  );

}


const styles: Record<string, React.CSSProperties> = {

  nameHolder: {
    backgroundColor: "#f2c85b",
    padding: "8px 10px",
    color:"#000000",
    borderRadius: "5px",
    fontSize:"1em"
  }
};





