import React, { useState,useEffect } from "react"

import { MentorDataType } from "../../types/DataTypes"
import { useUser } from "../../contexts/UserContext"
import { listDisplayDataType } from "../../types/DataTypes"
import TopProfileSectionComponent from "../../helpers/TopProfileSectionComponent"
import {Grid, Box } from "@mui/material"

import ListMentees from "../../components/users/mentor/ListMentees"


import UpcomingSessions from "../../components/users/mentor/UpcomingSessions"

import RequestMenteeComponent from "../../components/users/mentor/RequestMenteeComponent"
import OpenUpForSessions from "../../components/users/mentor/OpenUpForSessions"
import MenteeNotes from "../../components/users/mentor/MenteeNotes"

import DashboardSectionBorder from "../../components/users/mentor/DashboardSectionComponentWithBorder"










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
                 <DashboardSectionBorder title="Upcoming Session(s)">
                    <UpcomingSessions user={user as MentorDataType} />
                    </DashboardSectionBorder>
                </Grid>
            <Grid item xs={8}>
                    <DashboardSectionBorder title="Mentee(s)">
                         <ListMentees mentor={user as MentorDataType} />
                    </DashboardSectionBorder>
                </Grid>

                         
                <Grid item xs={4} >
                    <Grid container spacing={3}>
                        <Grid item>
                        <DashboardSectionBorder title="Mentorship Request(s)">
                            <RequestMenteeComponent mentor={user as MentorDataType} />
                        </DashboardSectionBorder>
                        </Grid>
                        
                        <Grid item>
                        <DashboardSectionBorder title="Mentee note(s)">
                            <MenteeNotes/>
                            </DashboardSectionBorder>
                        </Grid>
                    </Grid>
                   
                   
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