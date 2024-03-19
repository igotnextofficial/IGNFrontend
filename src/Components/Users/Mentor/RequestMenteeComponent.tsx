import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { Box,Grid,Button } from "@mui/material"

import { ArtistFake } from "../../../fake-data/ArtistFake"

import DashboardSectionComponent from "../../DashboardSectionComponent"
import ListDisplayComponent from "../../../Helpers/ListDisplayComponent"

import { listDisplayDataType,ArtistDataType,MentorDataType } from "../../../Types/DataTypes"

const handleApproved = (id:string) => {}

const handleDecline = (id:string) => {}

const RequestMenteeComponent =  ({user}: {user:MentorDataType}) => {
    const [data,setData ] = useState<ArtistDataType[]>([])

    useEffect(() => {
        setData(ArtistFake.slice(6,10))
    },[])


    return <>
       <Box sx={{border:"1px solid rgba(0,0,0,0.1)", padding:"8px 20px" , borderRadius:"5px",backgroundColor:"white"}}>
            <DashboardSectionComponent title={`Request(s) For Mentorship (${data.length})`}>
                {data.length > 0 ?  data.map(mentee => {
                    const data:listDisplayDataType = {
                        title:`${mentee.name} (${mentee.username})`,
                        image_url:mentee.image,
                        subtitle:`${mentee.bio.substring(0,200)} ${mentee.bio.length > 200 ? "..." : ""}` 
                    }

                   
                    return (
                            <>
                          
                            <Link to={`mentee/${user.id}/notes`}>  <ListDisplayComponent data={data} /></Link>
                            <Grid container spacing={2} justifyContent={"flex-end"}>
                                <Grid item><Button onClick={() => {
                                    handleApproved(mentee.id)
                                }} variant="contained" color="success"> Approve </Button></Grid>
                                <Grid item><Button onClick={() => {
                                    handleDecline(mentee.id)
                                }} variant="contained" color="error"> Decline </Button></Grid>
                            </Grid>
                            </>

                    )
                     
                }) : null }
            </DashboardSectionComponent>
            </Box>

      
    </>
       

}


export default RequestMenteeComponent