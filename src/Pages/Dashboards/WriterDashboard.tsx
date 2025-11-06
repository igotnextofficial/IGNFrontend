import DashboardSectionComponent from "../../components/DashboardSectionComponent";

import Grid from '@mui/material/Grid';


import DisplayTasks from "../../components/DisplayTasks";
import {tasksData}  from "../../data";
import Chart from "../../components/Charts";
import ToDo from "../../components/ToDo";
import DisplayTextEditor from "../../components/article/DisplayTextEditor";
import EditorProvider from "../../providers/EditorProvider";
import WriterArticlesPanel from "../../components/article/WriterArticlesPanel";


const WriterDashboard = () => {
    return (
        <>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>

            <Grid className="add-shadow" item xs={6} md={6}>
                    <DashboardSectionComponent  width={800} title="Compose Article" >
                        <></>
                        <EditorProvider>
                      <DisplayTextEditor/> 
                      </EditorProvider>
                    </DashboardSectionComponent>
                </Grid>

                <Grid className="add-shadow" item xs={6} md={6}>
                    <DashboardSectionComponent title="Most Popular Articles" >
                        <Chart/>
                        </DashboardSectionComponent>
                </Grid>

                <Grid className="add-shadow" item xs={6} md={4}>
                    <DashboardSectionComponent title="Your Articles" >
                        <WriterArticlesPanel />
                    </DashboardSectionComponent>
                </Grid>

                <Grid sx={{border:'2px solid #f7f7f7', height:'auto'}} item xs={6} md={4}>
                    <DashboardSectionComponent title="Tasks List" >
                        <DisplayTasks tasks={tasksData} />
                    </DashboardSectionComponent>
                    
          
                </Grid>
                <Grid className="add-shadow" item xs={6} md={4}>
                    <DashboardSectionComponent title="To Do List" >
                        <ToDo/>
                        {/* <DisplayTasks tasks={ tasksData } /> */}
                    </DashboardSectionComponent>
                    
          
                </Grid>

            </Grid>
            
        

            

            
        </>
    )
   
    // list of articles component with status of article and expected launch date - done
    // Assigned stories / a to do list component encompasses a due date .
    //compose article
    //most popular articles


}

export default WriterDashboard;
