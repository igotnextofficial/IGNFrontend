import React, { useState,useEffect } from "react"

import { HttpMethods, MentorDataType } from "../../types/DataTypes"
import { useUser } from "../../contexts/UserContext"
import { listDisplayDataType } from "../../types/DataTypes"
import TopProfileSectionComponent from "../../helpers/TopProfileSectionComponent"
import {Grid, Box } from "@mui/material"

import ListMentees from "../../components/users/mentor/ListMentees"


import UpcomingSessions from "../../components/users/mentor/UpcomingSessions"

import RequestMenteeComponent from "../../components/users/mentor/RequestMenteeComponent"
import OpenUpForSessions from "../../components/users/mentor/OpenUpForSessions"
import NotesFeedback from '../notes/NotesFeedback'

import DashboardSectionBorder from "../../components/users/mentor/DashboardSectionComponentWithBorder"
import LocalStorage from "../../storage/LocalStorage"
import useFetch from "../../customhooks/useFetch"
import { APP_ENDPOINTS } from "../../config/app"










const MentorDashboard = ()=>{
    const {user}  = useUser()
    const {fetchData} = useFetch()
    const [data,setData] = useState<listDisplayDataType>()
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