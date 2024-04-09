import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { Box,Grid,Button } from "@mui/material"



import DashboardSectionComponent from "../../DashboardSectionComponent"
import ListDisplayComponent from "../../../Helpers/ListDisplayComponent"
import { useUser } from "../../../Contexts/UserContext"

import { listDisplayDataType, MentorDataType, MenteeDataType,  HttpMethods } from "../../../Types/DataTypes"


import { sendRequest } from "../../../Utils/helpers"



const handleDecline = (id:string) => {}

const RequestMenteeComponent = ({mentor}: {mentor:MentorDataType}) => {
    const {user,updateUser} = useUser()
    const [data,setData ] = useState<MenteeDataType[]>([])

    useEffect(() => {
        setData(mentor.mentees.filter(mentee => mentee.status === "pending"))
     
    },[mentor])

    const handleApproved = async (mentee:MenteeDataType) => {
        let statusUpdate = {status : "approved"}
        let updatedMentee = {...mentee,...statusUpdate}
        let currentUser =  user as MentorDataType
        let currentMentees =  currentUser.mentees.filter(item => item.id !== updatedMentee.id)
        let newMentee = {mentees:[updatedMentee,...currentMentees]}
        let url = `${process.env.REACT_APP_TEST_API}/mentors/approve/${mentee.request_id}`
        let updatedUser = {...user, ...newMentee}
        updateUser(updatedUser as MentorDataType)
        let response = await sendRequest(HttpMethods.POST, url)
        if(response === null){
            console.log(`undo`)
        }
    
   
    }
    return <>
       <Box sx={{border:"1px solid rgba(0,0,0,0.1)", padding:"8px 20px" , borderRadius:"5px",backgroundColor:"white"}}>
            <DashboardSectionComponent title={`Request(s) For Mentorship (${data.length})`}>
                {data.length > 0 ?  data.map(mentee => {
                    const data:listDisplayDataType = {
                        title:`${mentee.fullname} (${mentee.username})`,
                        image_url:mentee.image,
                        subtitle:`${mentee.bio.substring(0,200)} ${mentee.bio.length > 200 ? "..." : ""}` 
                    }

                   
                    return (
                        <React.Fragment key={mentee.id}>
                          
                            <Link to={`mentee/${mentor.id}/notes`}>  <ListDisplayComponent data={data} /></Link>
                            <Grid container spacing={2} justifyContent={"flex-end"}>
                                <Grid item><Button onClick={() => {
                                    handleApproved(mentee)
                                }} variant="contained" color="success"> Approve </Button></Grid>
                                <Grid item><Button onClick={() => {
                                    handleDecline(mentee.id)
                                }} variant="contained" color="error"> Decline </Button></Grid>
                            </Grid>
                            </React.Fragment>

                    )
                     
                }) : null }
            </DashboardSectionComponent>
            </Box>

      
    </>
       

}




export default RequestMenteeComponent