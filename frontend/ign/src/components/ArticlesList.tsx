import React from "react";
import DisplayArticle from "./DisplayArticles";
import { ArticleDataType } from "../types/DataTypes";

import { Box, Divider, Typography, Link } from "@mui/material";
import Article from "../Models/users/Article";
import ListArticlesComponent from "./Article/ListAritclesComponent ";
import { useEffect, useState } from "react";

const ArticlesList = () => {

    const [userArticles, setArticles] = useState<ArticleDataType[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const article = new Article();
            try {
                const articles = await article.retreiveAll();
                setArticles(articles);
            } catch (error) {
                console.error("Error fetching articles:", error);
                // Handle error as needed
            }
        };
    
        fetchArticles();
    }, []); // Passing an empty array to run only once after the initial render

  
    return (
        <>
            <Box  component={'div'} sx={{backgroundColor:'background.paper', maxWidth:'500px', padding:'5px'}}>
                
                <Typography
                       sx={{ display: 'block',color:'#1d1917', fontSize:'1.2em', padding:'10px', fontWeight:'bold' }}
                       component="h2"
                       variant="body2"  
                >
                    Published Articles
                </Typography>
                <Divider></Divider>
                
                <ListArticlesComponent articles={userArticles}/>
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