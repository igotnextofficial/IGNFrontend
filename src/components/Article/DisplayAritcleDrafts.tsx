import { useEffect, useState } from "react";

import { Box,Typography,Divider,Grid,List,ListItem,ListItemText, Button, IconButton } from "@mui/material";
import {Backdrop} from "@mui/material";
import {Paper} from "@mui/material";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

import { ArticleDataType } from "../../types/DataTypes";
import Article from "../../Models/Users/Article";



const DisplayArticleDrafts = ({ article_drafts = [], updatedArticle }: 
    { article_drafts: ArticleDataType[], 
        updatedArticle:React.Dispatch<React.SetStateAction<ArticleDataType>> } ) => {

    const [currentSelectedDraft,setCurrentSelectedDraft] = useState<ArticleDataType | null>(null);
    const [currentSelectedDraftTitle,setCurrentSelectedDraftTitle] = useState("");
    const [currentSelectedDraftContent,setCurrentSelectedDraftContent] = useState("");
    const [restoreDraft,setRestoreDraft] = useState(false);
    const [ignore,setIgnore] = useState(true);
    const [open, setOpen] = useState(false);

    const removeHtmlTags = (content = "") => {
        return content.replace(/<[^>]*>/g, '')
    }
    const findArticle = (id = "") => {
        const foundArticle = article_drafts.filter(item => {
            return item.id === id;
        })
        return foundArticle ? foundArticle.pop() : null;
    }
    
    const getId = (id="") => {
        const start = id.indexOf('-') + 1;
        return id.substring(start);
        
    }

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const handleSetArticle = (id = "") => {
        const article = findArticle(id);
        if(article){
           setCurrentSelectedDraft(article);
        }
    }
    const handleDraftSelection = (id="") => {
        handleSetArticle(id)
        if(currentSelectedDraft){
           handleOpen();
        }
    }

    const handleViewDraft = (event:React.MouseEvent<HTMLButtonElement>) =>{
        handleDraftSelection(getId(event.currentTarget.id))
    }

    const handleRestoreDraft = (event:React.MouseEvent<HTMLButtonElement>) =>{
        handleSetArticle(getId(event.currentTarget.id))
        setIgnore(false);
        setRestoreDraft(true);
    }
    
    useEffect(()=>{
        if(currentSelectedDraft !== null){
            setCurrentSelectedDraftTitle(currentSelectedDraft.title);
            setCurrentSelectedDraftContent(removeHtmlTags(currentSelectedDraft.content));
        }
    },[currentSelectedDraft])
    
    useEffect(() => {
        if(!currentSelectedDraft){return}
    
        const restore = async () => {
           const articleHandler = new Article();
           const response = await articleHandler.restore(currentSelectedDraft.id);
           
           if(response){
             updatedArticle(currentSelectedDraft)
           }
           else{
            alert(`error updating.`)
            //error
           }
        }
        
        if(!ignore){
            restore()            
        }


        return ()=>{
            setRestoreDraft(false)
            setIgnore(true)
        }
    },[restoreDraft,ignore])
    
    const ShowCurrentSelectedDraft = ()=>{
       
        return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          
        >
            
            <Paper elevation={6}>
     
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <Box sx={{ mt: 1,mb: 3, mx: 1 }}>
                        <Grid container alignItems="center">
                            <Grid container justifyContent={"flex-end"}>
                                <Grid item>
                                    <IconButton onClick={handleClose} aria-label="delete" size="medium">
                                        <HighlightOffRoundedIcon fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <Typography gutterBottom variant="h4" component="div" sx={{textDecoration:"underline"}}>
                                    {currentSelectedDraftTitle}
                                </Typography>
                            </Grid>

                        </Grid>
                        <Typography color="text.secondary" variant="body2" style={{padding:"4px 8px"}}>
                            {currentSelectedDraftContent}
                        </Typography>
                    </Box>
                    <Divider variant="middle" />

                    <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                        <Button onClick={handleRestoreDraft}>Restore</Button>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
        )
    }

    const Drafts = () => {
        let data = article_drafts.map(article => {
            return (
                <List key={article.id}>
                <ListItem>
                    
                    <ListItemText primary={
                        <Typography
                            sx={{color:'#c7c7c7',fontSize:'1em'}}
                        >{article.title} - </Typography> 
                    } secondary={
                        <Typography
                        sx={{color:'#c7c7c7',fontSize:'1em'}}
                        >{removeHtmlTags(article.content.substring(0,50))}...</Typography>
                    }/>
                    <Button id={`view-${article.id}`} onClick={handleViewDraft} >View</Button>
                    <Button id={`restore-${article.id}`} onClick={handleRestoreDraft}>restore</Button>
                
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

       article_drafts.length > 0 ? 
       <>
            <ShowCurrentSelectedDraft/>
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

const styles={
    title:{},
    content:{}
}
export default DisplayArticleDrafts;