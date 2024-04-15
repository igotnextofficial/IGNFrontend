import React, { useContext } from "react";
import WriterDashboard from "./WriterDashboard";

import ContentContainer from "../../Utils/ContentContainer";
import { UserContext } from "../../Contexts/UserContext";
import { useParams } from "react-router-dom";
import MentorDashboard from "./MentorDashboard";
import ArtistDashboard from "./ArtistDashboard";

// const isCorrectRole = (role,user) => {
//     return user.role === role
// }
// Define the dashboards object with specific components for each role
const dashboards = {
    mentor: <MentorDashboard/>,
    artist: <ArtistDashboard/>,
    writer: <WriterDashboard/>
};

// Define a type for the role keys
type DashboardRole = keyof typeof dashboards;

// Adjust the DisplayDashboard component to use DashboardRole for the role prop
const DisplayDashboard: React.FC<{role: DashboardRole}> = ({role}) => {
    return <>{dashboards[role]}</>;
}

const Dashboard = () => {
    const{ user }= useContext(UserContext)
    const {role} = useParams()
        console.log(`the user role is ${user?.role}`)
    return(
       <ContentContainer>
            
            {/* <h1>Welcome, {user?.fullname} role: {role}</h1>
            <TemporaryDrawer/>
            <p>{document.cookie}</p> */}
            
            {role && <DisplayDashboard role={role as DashboardRole} />}
        </ContentContainer>
    )
}

export default Dashboard;