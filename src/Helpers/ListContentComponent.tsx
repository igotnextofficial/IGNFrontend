import * as React from 'react';


import {MenteeDataType, SessionWithMenteeDataType } from '../types/DataTypes';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar } from "@mui/material"


import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/SessionsDates';


export default function  ListContentComponent({session} : {session: SessionWithMenteeDataType}) {
  return (
      <>
      <Link  to={`/profile/${session.mentee?.role.type.toLowerCase()}/${session.mentee?.id}`}>

      <List sx={{width: '100%'}}>
      <ListItem sx={styles.nameHolder}>
        <ListItemAvatar>
          <Avatar>
            <ScheduleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${session.mentee.fullname}`} secondary={ `${formatDate(session.start_time)}`} />
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





