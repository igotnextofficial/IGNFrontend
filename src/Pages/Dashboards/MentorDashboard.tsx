import React, { useState,useEffect } from "react"

import { BookingSessionDataType, HttpMethods, MentorDataType, SessionDataType, UserDataType,SessionWithMenteeDataType } from "../../types/DataTypes"
import { useUser } from "../../contexts/UserContext"
import { listDisplayDataType } from "../../types/DataTypes"
import TopProfileSectionComponent from "../../helpers/TopProfileSectionComponent"
import {Grid, Box } from "@mui/material"

import ListMentees from "../../components/users/mentor/ListMentees"


import UpcomingSessions from "../../components/users/mentor/UpcomingSessions"
import PendingSessions from "../../components/users/mentor/PendingSessions"
import RequestMenteeComponent from "../../components/users/mentor/RequestMenteeComponent"
import OpenUpForSessions from "../../components/users/mentor/OpenUpForSessions"
import NotesFeedback from '../notes/NotesFeedback'
import CloseOutSessions from "../../components/users/mentor/CloseOutSessions"

import DashboardSectionBorder from "../../components/users/mentor/DashboardSectionComponentWithBorder"
import LocalStorage from "../../storage/LocalStorage"
import useFetch from "../../customhooks/useFetch"
import { APP_ENDPOINTS } from "../../config/app"
 









const MentorDashboard = ()=>{
    const {user}  = useUser()
    const {fetchData} = useFetch()
    const [data,setData] = useState<listDisplayDataType>()
    const [sessionsWithMentees,setSessionsWithMentees] = useState<SessionWithMenteeDataType[]>([])
    useEffect(()=>{
        const loadSpecialties = async ()=>{
            const response = await fetchData(APP_ENDPOINTS.GENERIC.SPECIALTIES)
          
            if(response !== null){
                const specialties = response.data.map((item:any)=>item.name)
                local_storage.save("specialties",specialties)
            }else{
                throw new Error("issue loading specialties")
            }
        }
        const local_storage = new LocalStorage();
        if(!local_storage.hasItem("specialties")){
              loadSpecialties().then(()=>{
              }).catch((e)=>{
              
              })
        }
        else{
            // console.log("specialties already loaded")
            // console.log(local_storage.load("specialties"))
        }  




        
        
    },[])
    useEffect(()=>{
        if(user !== null){
            setData({
                title:`${user?.fullname}'s Mentor Dashboard`,
                image_url:user?.profile_photo_path ?? "",
                subtitle: "", 
                meta:`specialties: ${user.specialties.join(", ")}` 
             })
        }

        const sessions_with_mentees_data: SessionWithMenteeDataType[] = []
        user?.bookings.forEach((booking:BookingSessionDataType)=>{
            const mentee_id = booking.mentee_id;
            const mentee = user?.mentees.find((mentee:UserDataType)=>mentee.id === mentee_id);
            booking.sessions.forEach((session:SessionDataType)=>{
               const session_data = {...session,mentee}
               sessions_with_mentees_data.push(session_data)
            })
        })

        setSessionsWithMentees(sessions_with_mentees_data);

        console.log(`sessions with mentees data is ${JSON.stringify(sessions_with_mentees_data,null,2)}`)
        // setSessionsWithMentees(sessions_with_mentees_data)

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
                    <UpcomingSessions sessions={sessionsWithMentees} />
                    </DashboardSectionBorder>
                </Grid>
            <Grid item xs={12}>
                 <DashboardSectionBorder title="Pending Session Requests">
                    <PendingSessions sessions={sessionsWithMentees} />
                    </DashboardSectionBorder>
                </Grid>
                <Grid item xs={12}>
                    <DashboardSectionBorder title="Close Out Session(s)">
                        <CloseOutSessions sessions={sessionsWithMentees} />
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
                                <NotesFeedback/>
                            </DashboardSectionBorder>
                        </Grid>
                    </Grid>
                   
                   
                </Grid>

    
          

                 {/* <Grid item xs={6}>
                 {   data && <TopProfileSectionComponent user={data} bio={user.bio} />}
                </Grid>

                <Grid item xs={6}>
                    <ListMentees user={user as MentorDataType} />
                </Grid>  */}

                

                
       
            </Grid>
              
                
            </>
        
        ) 
        

}

export default MentorDashboard