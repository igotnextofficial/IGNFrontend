import React, {useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box,Grid} from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { MentorDataType,MenteeDataType } from '../Types/DataTypes';
import { CalendarMonth } from '@mui/icons-material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from 'react-router-dom';
//  <CalendarMonth/>

const DefaultNameHolder = ({name} : {name:string}) => {
 
}


export default function CardContentComponent({data} : {data:MenteeDataType}) {

  return (
      <>
      <Link to="/">
        <Box component="div"  sx={styles.mainCardHolder}>
   
          <Box component="div" sx={styles.overlay} />
          <Box sx={styles.nameHolder} ><Typography variant='subtitle2' sx={{fontSize:"1.3em",color:"#000000"}}>{data.fullname}</Typography></Box>

          <Box component="div" sx={styles.overlayText}/>
          <Box sx={{position:"absolute",bottom:0}}>

          <Grid container sx={{padding:"8px 10px"}} spacing={6} justifyContent={'center'} alignItems={"center"}>
            <Grid item xs={2}> <ScheduleIcon  sx={{color:"white",fontSize:50}}/></Grid>
            
            <Grid item xs={9}><Typography variant='subtitle2' sx={{color:"white", fontSize:"1.3em"}}>{`${data.nextSession} `}</Typography></Grid>
         </Grid>
          </Box>
          <img src={data.image}  alt=""  style={styles.image}/>
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
    objectFit: "cover", // This is now correctly typed
  }
};
