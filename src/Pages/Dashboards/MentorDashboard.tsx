import React, { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import { MentorDataType } from "../../Types/DataTypes"
import { useUser } from "../../Contexts/UserContext"
import { listDisplayDataType } from "../../Types/DataTypes"
import TopProfileSectionComponent from "../../Helpers/TopProfileSectionComponent"
import ListDisplayComponent from "../../Helpers/ListDisplayComponent"
import { Grid, Typography } from "@mui/material"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar} from "@mui/material"
import SectionComponent from "../../Helpers/SectionComponent"
import DashboardSectionComponent from "../../Components/DashboardSectionComponent"

const UpcomingSessions =  ({user}: {user:MentorDataType}) => {
    return <>
            <DashboardSectionComponent title="Upcoming Session(s)">
                {user.mentees.length > 0 ?  user.mentees.map(mentee => {
                    const data:listDisplayDataType = {
                        title:mentee.username,
                        image_url:mentee.image,
                        subtitle:`${mentee.bio.substring(0,200)} ${mentee.bio.length > 200 ? "..." : ""}` 
                    }

                   
                    return <Link to={`mentee/${user.id}/notes`}>  <ListDisplayComponent data={data} /></Link>
                }) : <NoMentees/>}
            </DashboardSectionComponent>
  

      
    </>
}

const MenteeRequests =  ({user}: {user:MentorDataType}) => {
    return <>
            <DashboardSectionComponent title="Request(s) For Mentorship">
                {user.mentees.length > 0 ?  user.mentees.map(mentee => {
                    const data:listDisplayDataType = {
                        title:mentee.username,
                        image_url:mentee.image,
                        subtitle:`${mentee.bio.substring(0,200)} ${mentee.bio.length > 200 ? "..." : ""}` 
                    }

                   
                    return <Link to={`mentee/${user.id}/notes`}>  <ListDisplayComponent data={data} /></Link>
                }) : <NoMentees/>}
            </DashboardSectionComponent>
  

      
    </>
       

}

const ListMentees =  ({user}: {user:MentorDataType}) => {
    return <>
            <DashboardSectionComponent title="Mentees">
                {user.mentees.length > 0 ?  user.mentees.map(mentee => {
                    const data:listDisplayDataType = {
                        title:mentee.username,
                        image_url:mentee.image,
                        subtitle:`${mentee.bio.substring(0,200)} ${mentee.bio.length > 200 ? "..." : ""}` 
                    }

                   
                    return <Link to={`mentee/${user.id}/notes`}>  <ListDisplayComponent data={data} /></Link>
                }) : <NoMentees/>}
            </DashboardSectionComponent>
  

      
    </>
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
                title:user?.name,
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
            <Grid container spacing={4} justifyContent={"center"}>
                <Grid item xs={8}>
                 {   data && <TopProfileSectionComponent user={data} bio={user.bio} />}
                </Grid>

                <Grid item xs={4}>
                    <ListMentees user={user as MentorDataType} />
                </Grid>

                
                <Grid item xs={4}>
                    <ListMentees user={user as MentorDataType} />
                </Grid>
                
                <Grid item xs={4}>
                    <MenteeRequests user={user as MentorDataType} />
                </Grid>

                
                <Grid item xs={4}>
                    <UpcomingSessions user={user as MentorDataType} />
                </Grid>
            </Grid>
              
                
            </>
        
        ) 
        

}

export default MentorDashboard