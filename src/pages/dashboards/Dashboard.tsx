import React from "react";
import WriterDashboard from "./WriterDashboard";
import User from "../../models/users/User";
import TemporaryDrawer from '../../components/navigation/LeftDrawer';

const Dashboard = () => {
    const user = new User()
    return(
        <div className="mainContainer">
            <TemporaryDrawer/>
            <h1>Welcome, {user.get()['name']}</h1>
            <p>{document.cookie}</p>

            <WriterDashboard/>
        </div>
    )
}

export default Dashboard;