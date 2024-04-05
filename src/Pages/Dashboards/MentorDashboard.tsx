import React, { useState,useEffect } from "react"

import { MentorDataType,CalendarDataType } from "../../Types/DataTypes"
import { useUser } from "../../Contexts/UserContext"
import { listDisplayDataType } from "../../Types/DataTypes"
import TopProfileSectionComponent from "../../Helpers/TopProfileSectionComponent"
import {Grid, Typography } from "@mui/material"

import ListMentees from "../../Components/Users/Mentor/ListMentees"

import {Box} from "@mui/material"

import UpcomingSessions from "../../Components/Users/Mentor/UpcomingSessions"

import RequestMenteeComponent from "../../Components/Users/Mentor/RequestMenteeComponent"
import OpenUpForSessions from "../../Components/Users/Mentor/OpenUpForSessions"


const ScheduledDate = ({date} : {date:CalendarDataType}) => {
    return (<>
            <Box  sx={{backgroundColor:'grey', borderRadius:"5px", border:" 1px solid #1d1917"}}>
                <Grid sx={{textAlign:"center"}} container justifyContent={"center"} alignContent={"center"}>
                    <Grid item xs={12} sx={{backgroundColor:"#03a0b0", color:"white",borderRadius:"3px", padding:" 5px 10px"}}> <Typography sx={{fontSize:"1.2em"}}> {date.month}</Typography></Grid>
                    <Grid item xs={12} sx={{backgroundColor:"#03a0b0", color:"white"}}> <Typography sx={{fontSize:"2em"}}>{date.day}</Typography></Grid>
                    <Grid item xs={12} sx={{backgroundColor:"#ffffff"}}> <Typography sx={{fontSize:"1.3em",color:"#1d1917"}}> {date.time}</Typography></Grid>
                </Grid>
            </Box>
    </>
    )
}

 



const NoMentees = () => {

   return <Typography variant="subtitle1" sx={{color:"lightgrey"}}> you currenly have no mentees.</Typography>
 

}





const MentorDashboard = ()=>{
    const {user}  = useUser()
    const [data,setData] = useState<listDisplayDataType>()
    useEffect(()=>{
        if(user && 'specialties' in user){
            setData({
                title:`${user?.fullname}'s Mentor Dashboard`,
                image_url:user?.image ?? "",
                subtitle: "", 
                meta:`specialties: ${user.specialties.join(",")}` 
             })
        }

    },[user])
        //needs to update schedule // maybe through zoom api not on this page.
        //end current mentorship session
        //view mentees and leave notes

        return  user && ( 
            <>
            <Grid container spacing={8} justifyContent={"center"}>
              <Grid item xs={12}>
              {   data &&
               <Box sx={{border:"1px solid rgba(0,0,0,0.1)", padding:"8px 20px" , borderRadius:"5px",backgroundColor:"white",maxWidth:"640px"}}>
             
                       <TopProfileSectionComponent user={data}  />
                       <OpenUpForSessions/>

               </Box>
               }
                </Grid>  
            <Grid item xs={12}>
                 <Box sx={{border:"1px solid rgba(0,0,0,0.1)", padding:"8px 20px" , borderRadius:"5px",backgroundColor:"white"}}>
                    <UpcomingSessions user={user as MentorDataType} />
                    </Box>
                </Grid>
            <Grid item xs={8}>
                    <ListMentees mentor={user as MentorDataType} />
                </Grid>

                         
                <Grid item xs={4}>
                    <RequestMenteeComponent mentor={user as MentorDataType}/>
                </Grid>

                {/* <Grid item xs={6}>
                 {   data && <TopProfileSectionComponent user={data} bio={user.bio} />}
                </Grid>

                <Grid item xs={6}>
                    <ListMentees user={user as MentorDataType} />
                </Grid> */}

                

                
       
            </Grid>
              
                
            </>
        
        ) 
        

}

export default MentorDashboard