import React, { useContext } from "react";
import WriterDashboard from "./WriterDashboard";
import User from "../../Models/users/User";
import TemporaryDrawer from '../../components/navigation/LeftDrawer';
import ContentContainer from "../../utils/ContentContainer";
import { UserContext } from "../../Contexts/UserContext";

const Dashboard = () => {
    const {user} = useContext(UserContext)
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