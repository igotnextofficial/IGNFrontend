
import { ArticleDataType } from "../../types/DataTypes";

import { Roles } from "../../types/Roles";
import DashboardSectionComponent from "../../components/DashboardSectionComponent";

import Grid from '@mui/material/Grid';


import DisplayTasks from "../../components/DisplayTasks";
import {tasksData}  from "../../data";
import Chart from "../../components/Charts";
import ToDo from "../../components/ToDo";
import ListArticlesComponent from "../../components/article/ListAritclesComponent ";


const WriterDashboard = () => {
    let userArticles: ArticleDataType[]  = [
        {
            title: 'Ashton Jones She Got Next',
            image_url:'https://i0.wp.com/starmometer.com/wp-content/uploads/2011/03/ashton.jpg?w=520&ssl=1',
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
            dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
            Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
            author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
            published:"06/21/2023"
    },
    {
        title: 'Austin Brown: The Legacy of a Family',
        image_url:'https://www.billboard.com/wp-content/uploads/media/austin-brown-650.jpg?w=650',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published:"06/23/2023"
    },
    {
        title: 'Tori Kelly: Navigating faith in the industry',
        image_url:'https://www.tampabay.com/resizer/lPpF9C1uMXYLL7E3pNQ9KSujOMU=/1200x1200/smart/cloudfront-us-east-1.images.arcpublishing.com/tbt/PTRAU3GGOMI6TCHRIBWI6S7HAY.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published:"06/23/2023"
    },
    {
        title: 'Daniel Caesar Featured Artist of the Month',
        image_url:'https://images.discotech.me/artists/None/ad2bfe02-4323-41e2-8c0e-979c237a0d3f.jpg?auto=format%2Ccompress&w=1000',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published:"06/23/2023"
    },
    {
        title: 'Georgia Reign: Latest Album - Love',
        image_url:'https://singersroom.com/wp-content/uploads/2016/10/Georgia-Reign.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published:"06/23/2023"
    },

]

    return (
        <>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>

            <Grid className="add-shadow" item xs={6} md={6}>
                    <DashboardSectionComponent  width={800} title="Compose Article" >
                        <></>
                     {/* <DisplayTextEditor/> */}
                    </DashboardSectionComponent>
                </Grid>

                <Grid className="add-shadow" item xs={6} md={6}>
                    <DashboardSectionComponent title="Most Popular Articles" >
                        <Chart/>
                        </DashboardSectionComponent>
                </Grid>

                <Grid className="add-shadow" item xs={6} md={4}>
                    <DashboardSectionComponent title="Published  Articles" >
                       
                            <ListArticlesComponent articles={userArticles}/>
                      
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