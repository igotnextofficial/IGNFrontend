import * as React from 'react';


import {MenteeDataType } from '../types/DataTypes';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar } from "@mui/material"


import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from 'react-router-dom';



export default function  ListContentComponent({data} : {data:MenteeDataType}) {
  return (
      <>
      <Link to="/">

      <List sx={{width: '100%'}}>
      <ListItem sx={styles.nameHolder}>
        <ListItemAvatar>
          <Avatar>
            <ScheduleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${data.fullname}`} secondary={`${data.session_date}`} />
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





