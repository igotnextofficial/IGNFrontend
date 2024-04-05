import * as React from 'react';

import Typography from '@mui/material/Typography';
import {Box,Grid} from '@mui/material';

import {MenteeDataType } from '../Types/DataTypes';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar } from "@mui/material"


import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from 'react-router-dom';
//  <CalendarMonth/>

const DefaultNameHolder = ({name} : {name:string}) => {
 
}


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
        <ListItemText primary={`${data.fullname}`} secondary={`${data.nextSession}`} />
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





