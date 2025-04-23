import React, {useEffect} from 'react';

import Typography from '@mui/material/Typography';
import {Box,Grid} from '@mui/material';

import { MenteeDataType, MentorSessionDataType } from '../types/DataTypes';

import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';


export default function CardContentComponent({user,session} : {user:MenteeDataType,session:MentorSessionDataType}) {
 
  return (
      <>

      <Link to={`/profile/artist/${user?.id}`} >
        <Box component="div"  sx={styles.mainCardHolder}>
   
          <Box component="div" sx={styles.overlay} />
          <Box sx={styles.nameHolder} ><Typography variant='subtitle2' sx={{fontSize:"1.3em",color:"#000000"}}>{user.fullname}</Typography></Box>

          <Box component="div" sx={styles.overlayText}/>
          <Box sx={{position:"absolute",bottom:0}}>

          <Grid container sx={{padding:"8px 10px"}} spacing={4} justifyContent={'center'} alignItems={"center"}>
            <Grid item xs={2}> <ScheduleIcon  sx={{color:"white",fontSize:30}}/></Grid>
            
            <Grid item xs={10}><Typography variant='subtitle2' sx={{color:"white", fontSize:"1.3em"}}>{`${ dayjs(session.start_time).format('dddd MMM D [@] hh:mm A')} `}</Typography></Grid>
         </Grid>
          </Box>
          <img src={user.profile_photo_path}  alt=""  style={styles.image}/>
        </Box>
        </Link>
      </>
  );

  

}


const styles: Record<string, React.CSSProperties> = {
  mainCardHolder: {
    position: 'relative',
    width:"100%",
    height: "400px",
    overflow: "hidden",
    borderRadius: "10px",
  },
  nameHolder: {
    backgroundColor: "#f2c85b",
    position: "absolute",
    top: 0,
    left: 0,
    padding: "8px 10px",
    borderRadius: "0 0 5px 0",
  },
  overlay: {
    position: 'absolute',
    backgroundColor: "#000000",
    height: '100%',
    width: '100%',
    opacity: "0.3",
  },
  overlayText: {
    position: 'absolute',
    backgroundColor: "#000000",
    boxShadow: "0px -10px 7px rgb(0, 0, 0)",
    bottom: "0",
    width: '100%',
    height: '20%',
    opacity: "0.7",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "top center",
    backgroundColor:"black" // This is now correctly typed
  }
};
