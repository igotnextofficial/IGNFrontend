import React from "react";
import SectionComponent from "../../../Helpers/SectionComponent";
import InformationComponent from "../../../Helpers/InformationComponent";
import DisplayMentorCard from "./DisplayMentorCard";
import Mentor from "../../../Models/Users/Mentor";
import { Grid } from "@mui/material";
import ListMentors from "./ListMentors";

const MentorListComponent = () => {
    
    const ShowMentors = () =>{
        const mentorsInit = new Mentor();
        const mentors = mentorsInit.getAll();
        return(
        
                <Grid container sx={styles.Container}>
                {mentors.map(mentor => {
                    return <Grid sx={{padding:"1rem"}} Item><DisplayMentorCard mentor={mentor} /></Grid>
                })}
    
                </Grid>
        
        )
    }
   
    return( 
        <SectionComponent >
            <InformationComponent title="Meet Our Amazing Mentors Ready to Guide Your Journey" />

            <ListMentors/>
        </SectionComponent>
       
    )
}

const styles = {
    Container:{
        
        
        marginTop: "3rem"
    }
    
}

export default MentorListComponent