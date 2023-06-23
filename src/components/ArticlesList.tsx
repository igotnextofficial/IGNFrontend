import React from "react";
import DisplayArticle from "./DisplayArticles";
import { ArticleDataType } from "../types/DataTypes";

import { Box, Divider, Typography } from "@mui/material";

const ArticlesList = () => {
    let userArticles: ArticleDataType[]  = [
        {
            title: 'Ashton Jones She Got Next',
            image:'https://i0.wp.com/starmometer.com/wp-content/uploads/2011/03/ashton.jpg?w=520&ssl=1',
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
            dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
            Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
            author: 'Cierra Bellamy',
            published:"06/21/2023"
    },
    {
        title: 'Austin Brown: The Legacy of a Family',
        image:'https://www.billboard.com/wp-content/uploads/media/austin-brown-650.jpg?w=650',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: 'Cierra Bellamy',
        published:"06/23/2023"
    },
    {
        title: 'Tori Kelly: Navigating faith in the industry',
        image:'https://www.tampabay.com/resizer/lPpF9C1uMXYLL7E3pNQ9KSujOMU=/1200x1200/smart/cloudfront-us-east-1.images.arcpublishing.com/tbt/PTRAU3GGOMI6TCHRIBWI6S7HAY.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: 'Cierra Bellamy',
        published:"06/23/2023"
    },
    {
        title: 'Daniel Caesar Featured Artist of the Month',
        image:'https://images.discotech.me/artists/None/ad2bfe02-4323-41e2-8c0e-979c237a0d3f.jpg?auto=format%2Ccompress&w=1000',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: 'Cierra Bellamy',
        published:"06/23/2023"
    },
    {
        title: 'Georgia Reign: Latest Album - Love',
        image:'https://singersroom.com/wp-content/uploads/2016/10/Georgia-Reign.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: 'Cierra Bellamy',
        published:"06/23/2023"
    },

]

    const ListArticles: React.FC<{ articles: ArticleDataType[] }> = ({articles}) => {
        let output = articles.map((userArticle, index) => {
            return <DisplayArticle key={index}  { ...userArticle }  />
        })
       return  (
        <>
                {output}
        </>
        )
    }
    return (
        <>
            <Box component={'div'} sx={{backgroundColor:'background.paper', maxWidth:'500px', padding:'5px'}}>
                
                <Typography
                       sx={{ display: 'block',color:'#1d1917', fontSize:'1.2em', padding:'10px', fontWeight:'bold' }}
                       component="h2"
                       variant="body2"  
                >
                    Published Articles
                </Typography>
                <Divider></Divider>
                
                <ListArticles articles={userArticles}/>
            </Box>
          
        
            {/* userArticles.map((key,userArticle)=> {
                <DisplayArticle {...userArticle} />
            }); */}
            
        </>
    )
   
    // list of articles component with status of article and expected launch date
    // Assigned stories / a to do list component encompasses a due date .
    //compose article
    //most popular articles


}

export default ArticlesList;