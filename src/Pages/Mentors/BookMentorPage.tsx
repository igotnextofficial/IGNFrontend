import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Grid, Typography, Box } from "@mui/material"
import Mentor from "../../Models/Users/Mentor"
import { MentorDataType } from "../../Types/DataTypes"
import SectionComponent from "../../Helpers/SectionComponent"
import PaymentForm from "../../Helpers/PaymentForm"
import BackgroundCoverImage from "../../Components/BackgroundCoverImage"
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
                            <IgnPillComponent description={`Mentor: ${currentMentor?.name}`} link="" />
                            <img style={{ width: "100%",border:"2px solid #ecdb22 " }} src={currentMentor?.image} alt={currentMentor?.name} />
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

const styles = {
    holder: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0))",
        padding: " 0.4rem 1rem"
    }
}
export default BookMentorPage