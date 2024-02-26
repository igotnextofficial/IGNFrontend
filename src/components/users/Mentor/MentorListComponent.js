import React from "react";
import SectionComponent from "../../../Helpers/SectionComponent";
import InformationComponent from "../../../Helpers/InformationComponent";
import DisplayMentorCard from "./DisplayMentorCard";
import Mentor from "../../../Models/Users/Mentor";
import { Grid } from "@mui/material";
import ListMentors from "./ListMentors";

const MentorListComponent = () => {
    

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