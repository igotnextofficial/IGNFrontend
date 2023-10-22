import BackgroundCoverImage from "../BackgroundCoverImage";
import { Box,Link,Typography } from "@mui/material";
import { useState } from "react";
import IgnPillComponent from "../../Helpers/IgnPillComponent";
import { ArticleDataType } from "../../types/DataTypes";

const DisplayArticleComponent = ({article, height=50,featured=false} : {article:ArticleDataType,height: number, featured:boolean}) => {
    
     return(
        <BackgroundCoverImage xs={12} sm={12} md={12} sx={{height:`${height}vh`,position:"relative"}} url={`${article.image_url}.jpg`}>
        <Box sx={featured ? styles.featuredArticleHolder : styles.ArticleHolder}>
            <IgnPillComponent description={article.category} link="/" />
          
            <Typography sx={styles.title} variant="h5">{article.title}</Typography>
        </Box>
        </BackgroundCoverImage> 
     )
}

const styles={
    featuredArticleHolder:{
        position:"absolute",
        bottom:0,
        width:"100%",
        backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0))", 
        padding:" 0.4rem 10rem"
    
    },

    ArticleHolder:{
        position:"absolute",
        bottom:0,
        width:"100%",
        backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0))", 
        padding:" 0.4rem 1rem"
    
    },
    category:{
        color:"#1d1917",
        backgroundImage: "linear-gradient(to right,#ebd805,#eee154 )",
        borderRadius:"3px",
        textDecoration:"none",
        fontSize:"0.8em",
        padding:"5px 8px",
        
    },
    title:{
        color:"white",
        lineHeight: "1.7rem",
        letterSpacing: "0rem",
        padding:"0.4rem 0" 

    }
}

export default DisplayArticleComponent;
