import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Grid, Typography, Box } from "@mui/material"
import Mentor from "../../Models/Users/Mentor"
import { MentorDataType } from "../../Types/DataTypes"
import SectionComponent from "../../Helpers/SectionComponent"
import PaymentForm from "../../Helpers/PaymentForm"

import IgnPillComponent from "../../Helpers/IgnPillComponent"

const BookMentorPage = () => {
    const [mentors, setMentors] = useState<MentorDataType[]>([])
    const [currentMentor, setCurrentMentor] = useState<MentorDataType>()
    const { mentorId } = useParams()


    useEffect(() => {
        const mentorClass = new Mentor()
        setMentors(mentorClass.getAll());


    }, [])

    useEffect(() => {
        setCurrentMentor(mentors.find((mentor) => { return mentor.id === mentorId }))
    }, [mentors, mentorId])





    return (
        <>
            <SectionComponent>
                <Grid container direction={"column"}>



                    <Grid item>

                        <Box sx={{ maxWidth: '600px' }}>
                            <IgnPillComponent description={`Mentor: ${currentMentor?.fullname}`} link="" />
                            <img style={{ width: "100%",border:"2px solid #ecdb22 " }} src={currentMentor?.image} alt={currentMentor?.fullname} />
                        </Box>
                        <Typography sx={{ paddingTop: 2, paddingBottom: 2 }} variant="body1" >Mentorship Duration: 6 weeks</Typography>

                    </Grid>
                    <Grid item>
                        <PaymentForm />
                    </Grid>


                </Grid>
            </SectionComponent>

        </>
    )
}


export default BookMentorPage