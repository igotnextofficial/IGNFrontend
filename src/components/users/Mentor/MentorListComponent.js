
import SectionComponent from "../../../helpers/SectionComponent";
import InformationComponent from "../../../helpers/InformationComponent";

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