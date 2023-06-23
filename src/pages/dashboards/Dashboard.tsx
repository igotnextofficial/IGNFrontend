import React from "react";
import WriterDashboard from "./WriterDashboard";

const Dashboard = () => {
    return(
        <>
     
            <h1>Welcome To Dashboard</h1>
            <p>{document.cookie}</p>

            <WriterDashboard/>
        </>
    )
}

export default Dashboard;