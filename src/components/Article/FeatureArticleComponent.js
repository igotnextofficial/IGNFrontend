import { Grid } from "@mui/material";
import DisplayArticleComponent from "./DisplayArticleComponent";

const FeatureArticleComponent = () => {
    const articles = {
        featured:
        
            {
            title:"Radiant Creativity Unveiled: Kristina Belle Takes Center Stage",
            slug:"/articles/georgie-reign-artist-of-the-month",
            date:"10/15/2023",
            category:"Artist of the month",
            image_url:"singing"
        },
        
        ministories:
        
            [
                {title:"Musiq Soulchild: Rememering when i had next!",slug:"",date:"",category:"Advice from a mentor",image_url:"musiq"},
                {title:"Kayla and Johnny Heading on tour",slug:"",date:"",category:"Entertainment News",image_url:"concert"},
                {title:"Top ten upcoming Artist 2023",slug:"",date:"",category:"Featured Artists",image_url:"topartist"},
                {title:"Georgia Reign: The artist who will change the game",slug:"",date:"",category:"Who's Next",image_url:"reign"}
            ]
        
    };

    return( 
        <Grid container>
            <Grid item xs={6} >
                <DisplayArticleComponent article={articles.featured} featured={true} />
            </Grid>
            <Grid item xs={6}>
                <Grid container>
                    {
                    articles.ministories.map((articles, index) => {
                       return(
                        <Grid key={index} item xs={6}>
                            <DisplayArticleComponent article={articles} height={25} /> 
                         </Grid>
                       )
                    })
                    }
          
                </Grid>
            </Grid>
        </Grid>
  
        )
}   

export default FeatureArticleComponent

