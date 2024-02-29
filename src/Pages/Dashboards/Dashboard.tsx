import React, { useContext } from "react";
import WriterDashboard from "./WriterDashboard";
import User from "../../Models/Users/User";
import TemporaryDrawer from '../../Components/Navigation/LeftDrawer';
import ContentContainer from "../../Utils/ContentContainer";
import { UserContext } from "../../Contexts/UserContext";

const Dashboard = () => {
    const{ user }= useContext(UserContext)

    return(
       <ContentContainer>
            
            <h1>Welcome, {user?.name}</h1>
            <TemporaryDrawer/>
            <p>{document.cookie}</p>

            <WriterDashboard/>
        </ContentContainer>
    )
}

export default Dashboard;