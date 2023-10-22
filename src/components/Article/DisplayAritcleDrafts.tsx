import { Box,Typography,Divider,List,ListItem,ListItemText, Button } from "@mui/material";
import { ArticleDataType } from "../../types/DataTypes";
import ArticlesList from "../ArticlesList";
import ListArticlesComponent from "./ListAritclesComponent ";
const DisplayArticleDrafts = ({article_drafts = []} :{article_drafts:ArticleDataType[]} ) => {
    const Drafts = () => {
        let data = article_drafts.map(article => {
            return (<List key={article.id}>
                <ListItem>
                    
                    <ListItemText primary={
                        <Typography
                            sx={{color:'#c7c7c7',fontSize:'1em'}}
                        >{article.title} - </Typography> 
                    } secondary={
                        <Typography
                        sx={{color:'#c7c7c7',fontSize:'1em'}}
                        >{article.content.substring(0,50)}...</Typography>
                    }/>
                <Button>View</Button>
                <Button>restore</Button>
                
                </ListItem>
                <Divider></Divider>
            </List>
            
            )          
         
        })

        return (
            <>
            {data}
            </>
        )
    }
    return (
       article_drafts.length > 0 ? <>
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