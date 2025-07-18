import React, { useState,useEffect } from "react"

import { BookingSessionDataType, HttpMethods, MentorDataType, SessionDataType, UserDataType,SessionWithMenteeDataType } from "../../types/DataTypes"
import { useUser } from "../../contexts/UserContext"
import { listDisplayDataType } from "../../types/DataTypes"
import TopProfileSectionComponent from "../../helpers/TopProfileSectionComponent"
import {Grid, Box, CircularProgress } from "@mui/material"

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
import useHttp from "../../customhooks/useHttp"
import { SpecialtiesDataType } from "../../types/DataTypes"
 









const MentorDashboard = ()=>{
    const {user,accessToken, updateUser,updateManualLoading}  = useUser()
  
    const {get} = useHttp(accessToken);
    const [data,setData] = useState<listDisplayDataType>()
    const [isLoading,setIsLoading] = useState(false);
    const [sessionsWithMentees,setSessionsWithMentees] = useState<SessionWithMenteeDataType[]>([])
    useEffect(() => {
        const enrichMentor = async () => {
            if(!user?.id) return;
            setIsLoading(true);
            const [availability, sessions, specialties,stripe_account] = await Promise.allSettled([
                get(`${APP_ENDPOINTS.SESSIONS.BASE}/${user.id}/availability`),
                get(`${APP_ENDPOINTS.SESSIONS.MENTOR}/${user.id}`),
                get(APP_ENDPOINTS.GENERIC.SPECIALTIES),
                get(APP_ENDPOINTS.PRODUCTS.WITH_STRIPE_ACCOUNT.replace(":user_id",user.id))
              ]);
        
              const availabilityData = availability.status === 'fulfilled'
                ? availability.value.data?.data?.available ?? false
                : false;
        
              const sessionData = sessions.status === 'fulfilled'
                ? sessions.value.data?.data ?? []
                : [];

                const stripe_account_data = stripe_account.status === 'fulfilled'
                ? stripe_account.value.data ?? null
                : null;
              // really should happen on the edit profile form for a mentor
              if (specialties.status === 'fulfilled') {
                const local_storage = new LocalStorage();
                const specialties_data = specialties.value.data.data.map((item: any) => item.name);
                local_storage.save("specialties", specialties_data);
              }
             
        
              return {
                ...user,
                availability: availabilityData,
                bookings: sessionData,
                product: stripe_account_data
              };
        }
        enrichMentor().then((data) => {
    
             updateUser(data as UserDataType)
             setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
        })

       return () => {
            setIsLoading(false);
        }
    },[])
    useEffect(()=>{
        if(!user?.bookings) return;
  
        if(user !== null){
           const specialties = user.specialties || [];
            setData({
                title:`${user?.fullname}'s Mentor Dashboard`,
                image_url:user?.profile_photo_path ?? "",
                subtitle: "", 
                meta:`specialties: ${specialties.map?.((specialty:SpecialtiesDataType)=>specialty.name).join(", ")}`,
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

        updateManualLoading(false);
        // setSessionsWithMentees(sessions_with_mentees_data)

    },[user?.bookings])
        //needs to update schedule // maybe through zoom api not on this page.
        //end current mentorship session
        //view mentees and leave notes

    useEffect(()=>{
  
    },[sessionsWithMentees])
        return  user && ( 
            <>
            <Grid container spacing={8} justifyContent={"center"}>
              <Grid item xs={12}>
              {   data &&
               <Box sx={{border:"1px solid rgba(0,0,0,0.1)", padding:"8px 20px" , borderRadius:"5px",backgroundColor:"white",maxWidth:"640px"}}>
             
                       <TopProfileSectionComponent user={data}  />
                       <OpenUpForSessions user={user as MentorDataType}/>

               </Box>
               }
                </Grid>  
            <Grid item xs={12}>
                 <DashboardSectionBorder title="Upcoming Session(s)">
                 {
                            isLoading ?
                            <Box sx ={{ margin:'20px'}}><CircularProgress size={30}/> </Box> :
                            <UpcomingSessions sessions={sessionsWithMentees} />
                        }
                    
             
                    </DashboardSectionBorder>
                </Grid>
            <Grid item xs={12}>
                 <DashboardSectionBorder title="Pending Session Requests">
                 {
                            isLoading ?
                            <Box sx ={{ margin:'20px'}}><CircularProgress size={30}/> </Box> :
                            <PendingSessions sessions={sessionsWithMentees} />
                        }
                    
                    </DashboardSectionBorder>
                </Grid>
                <Grid item xs={12}>
                    <DashboardSectionBorder title="Close Out Session(s)">
                        {
                            isLoading ?
                            <Box sx ={{ margin:'20px'}}><CircularProgress size={30}/> </Box> :
                            <CloseOutSessions sessions={sessionsWithMentees} />
                        }
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