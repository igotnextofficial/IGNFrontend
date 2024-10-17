import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {  Grid, Button } from "@mui/material"

import ListDisplayComponent from "../../../helpers/ListDisplayComponent"
import { useUser } from "../../../contexts/UserContext"

import { listDisplayDataType, MentorDataType, MenteeDataType, HttpMethods } from "../../../types/DataTypes"


import { sendRequest } from "../../../utils/helpers"
import NoDataAvailable from "../../../utils/NoDataAvailable"



const handleDecline = (id: string) => { }

const RequestMenteeComponent = ({ mentor }: { mentor: MentorDataType }) => {
    const { user, updateUser } = useUser()
    const [data, setData] = useState<MenteeDataType[]>([])

    useEffect(() => {
        setData(mentor.mentees.filter(mentee => mentee.status === "pending"))

    }, [mentor])

    const handleApproved = async (mentee: MenteeDataType) => {
        let statusUpdate = { status: "approved" }
        let updatedMentee = { ...mentee, ...statusUpdate }
        let currentUser = user as MentorDataType
        let currentMentees = currentUser.mentees.filter(item => item.id !== updatedMentee.id)
        let newMentee = { mentees: [updatedMentee, ...currentMentees] }
        let url = `${process.env.REACT_APP_TEST_API}/mentors/approve/${mentee.request_id}`
        let updatedUser = { ...user, ...newMentee }
        updateUser(updatedUser as MentorDataType)
        let response = await sendRequest(HttpMethods.POST, url)
        if (response === null) {
            console.log(`undo`)
        }


    }
    return data.length > 0 ?<>

         {data.map(mentee => {
            const data: listDisplayDataType = {
                title: `${mentee.fullname} (${mentee.username})`,
                image_url: mentee.image || "",
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