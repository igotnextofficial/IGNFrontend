
import SectionComponent from "../../../Helpers/SectionComponent";
import InformationComponent from "../../../Helpers/InformationComponent";

import ListMentors from "./ListMentors";

const MentorListComponent = () => {
    

   
    return( 
        <SectionComponent >
            <InformationComponent title="Meet Our Amazing Mentors Ready to Guide Your Journey" />

            <ListMentors/>
        </SectionComponent>
       
    )
}



export default MentorListComponent