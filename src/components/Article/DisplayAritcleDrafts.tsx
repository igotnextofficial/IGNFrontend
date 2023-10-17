import { Box,Typography,Divider } from "@mui/material";
import { ArticleDataType } from "../../types/DataTypes";
import ArticlesList from "../ArticlesList";
import ListArticlesComponent from "./ListAritclesComponent ";
const DisplayArticleDrafts = ({article_drafts} :{article_drafts:ArticleDataType[]} ) => {
    console.log("The data in here")
    console.dir(article_drafts)
    const Drafts = () => {
        let data = article_drafts.map(article => {
            return <Typography component="h4">{article.title}</Typography>
        })

        return (
            <>
            {data}
            </>
        )
    }
    return (
       article_drafts ? <>
        <Box  component={'div'} sx={{backgroundColor:'background.paper', maxWidth:'500px', padding:'5px'}}>
            
            <Typography
                   sx={{ color:'#1d1917', fontSize:'1.2em',   }}
                   component="h4"
                   variant="body2"  
            >
                Drafts
            </Typography>
           
            <Divider></Divider>
            
            <Drafts/>
            <ListArticlesComponent articles={article_drafts}/>
        </Box>
      
    
        {/* userArticles.map((key,userArticle)=> {
            <DisplayArticle {...userArticle} />
        }); */}
        
    </> : 
    <>
    <Typography sx={{color:"#b8b8b8"}}>You have no Drafts</Typography>
    </>
    )
}
export default DisplayArticleDrafts;