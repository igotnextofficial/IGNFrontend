import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {  Grid, Button } from "@mui/material"

import ListDisplayComponent from "../../../helpers/ListDisplayComponent"
import { useUser } from "../../../contexts/UserContext"

import { listDisplayDataType, MentorDataType, MenteeDataType, HttpMethods } from "../../../types/DataTypes"


import { sendRequest } from "../../../utils/helpers"
import NoDataAvailable from "../../../utils/NoDataAvailable"
import { APP_ENDPOINTS, Endpoints } from "../../../config/app"
import { send } from "process"



const handleDecline = (id: string) => { }

const RequestMenteeComponent = ({ mentor }: { mentor: MentorDataType }) => {
    const { user, updateUser,accessToken } = useUser()
    const [data, setData] = useState<MenteeDataType[]>([])

    useEffect( () => {
        const loadData = async () => {
            const url = `${Endpoints.MENTOR}/${mentor.id}/mentees/pending`;
            const headers = { Authorization: `Bearer ${accessToken}` }
            const response = await sendRequest(HttpMethods.GET,url, null, headers);
            if(response !== null){
                let pending_mentees_ids = response.data.map((mentee: MenteeDataType) => {
                    return {"id":mentee.mentee_id};
                });

                const pending_mentees = await sendRequest(HttpMethods.POST,`${APP_ENDPOINTS.USER.BATCH}`,{data:pending_mentees_ids},headers);
 
                if(pending_mentees !== null){
                    let pending_mentees_list = pending_mentees.data as MenteeDataType[]
                
                    
                    setData(pending_mentees_list);
                }
                // setData(mentor.mentees.filter(mentee => mentee.status === "pending"))
            }

        }

        loadData()
     
    }, [])

    const handleApproved = async (mentee: MenteeDataType) => {
        const headers = { Authorization: `Bearer ${accessToken}` }
        console.log(`the headers i am sending to approve mentee are ${JSON.stringify(headers)}`)
        let url = `${Endpoints.MENTOR}/${user?.id}/mentees/${mentee.id}/approve`
        let statusUpdate = { status: "approved" }
        let updatedMentee = { ...mentee, ...statusUpdate }
        let currentUser = user as MentorDataType
        let currentMentees = currentUser.mentees.filter(item => item.id !== updatedMentee.id)
        let newMentee = { mentees: [updatedMentee, ...currentMentees] }
        let updatedUser = { ...user, ...newMentee }
        let data_without_approved_user = data.filter(item => item.id !== updatedMentee.id);
        setData(data_without_approved_user)
        updateUser(updatedUser as MentorDataType)
        let response = await sendRequest(HttpMethods.PUT, url, null, headers)
        if (response === null) {
            let statusUpdate = { status: "pending" }
            let updatedMentee = { ...mentee, ...statusUpdate }
        }
        else {
            let connect_mentor_to_mentee = await sendRequest(HttpMethods.POST,`${APP_ENDPOINTS.USER.BASE}/${mentee?.id}/mentors/${user?.id}`,null,headers);

            if(connect_mentor_to_mentee !== null){
                // console.log(`Connected mentor to mentee ${JSON.stringify(connect_mentor_to_mentee)}`)
            }
            else{
                // console.error(`Error connecting mentor to mentee`)
            }
        }


    }
    return data && data.length > 0 ?<>

         {data.map(mentee => {
            const data: listDisplayDataType = {
                title: `${mentee.fullname} (${mentee.username})`,
                image_url: mentee.profile_photo_path || "",
                subtitle: `${mentee.bio.substring(0, 200)} ${mentee.bio.length > 200 ? "..." : ""}`
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

        }) }




    </> : <NoDataAvailable/>


}




export default RequestMenteeComponent