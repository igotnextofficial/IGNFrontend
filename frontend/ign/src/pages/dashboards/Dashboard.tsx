import React from "react";
import WriterDashboard from "./WriterDashboard";
import User from "../../Models/users/User";
import TemporaryDrawer from '../../components/navigation/LeftDrawer';
import ContentContainer from "../../utils/ContentContainer";

const Dashboard = () => {
    const user = new User()
    return(
       <ContentContainer>
            <TemporaryDrawer/>
            <h1>Welcome, {user.get()['name']}</h1>
            <p>{document.cookie}</p>

            <WriterDashboard/>
        </ContentContainer>
    )
}

export default Dashboard;