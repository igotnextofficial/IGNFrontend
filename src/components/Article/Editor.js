import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import WordCount from "../../utils/WordCount";
import Article from "../../Models/users/Article";

const RANGE_LIMITS = {
    title:{
        min:Article.RANGE_LIMITS.TITLE.MIN,
        max:Article.RANGE_LIMITS.TITLE.MAX
    },
    content:{
        min:Article.RANGE_LIMITS.CONTENT.MIN,
        max:Article.RANGE_LIMITS.CONTENT.MAX
    }
};

const Editor = ()=>{
    const [content,setContent] = useState('');
    const [contentWithoutTags,setContentWithoutTags] = useState('');
    const [title,setTitle] = useState('');
    const [status,setStatus] = useState('draft')
    const [artilce,setArticle] = useState({title:'',content:'',status:'draft'})
    const [errors,setErrors] = useState({});
    const [canPublish,setCanPublish] = useState(false);




    const withinRange = (media = "") => {

        if(Object.keys(RANGE_LIMITS).includes(media)) {
            let mediaLength = media === Article.TITLE ? title.length : content.length;
            if(mediaLength >= RANGE_LIMITS[media].min && mediaLength <= RANGE_LIMITS[media].max ){
                return true;
            }
        }
 
        return false;
    }

    const updateTitle = (e) =>{
        setTitle(e.target.value)
        console.log(e.target.value)
    }

    const updateContent = (value,delta,source,editor) =>{
        
        setContent(value)
        setContentWithoutTags(editor.getContents().ops[0].insert)
        // setContent(e.target.value)
    }

    

    const populateData = () => {
        return {
            title: title,
            content:content,
            status:status
        }
    }

    const saveArticle = ()=>{
        let data = populateData();
        // console.table(data)
        //hit put endpoint to update article
    }

    const publishArticle = ()=>{
        setStatus('published')
    }

    useEffect(()=>{
        saveArticle();
        //hit endpoint 
    },[status])

    useEffect(()=>{
        if(withinRange(Article.TITLE) && withinRange(Article.CONTENT)){
            setCanPublish(true);
        }
    },[title,content])

    return(
        <>
        
            <Box component='div'>
                <Box component='div'>
                    <TextField id="article_title" label="title" variant="outlined" fullWidth onChange={updateTitle}  value={title}/>
                    <WordCount word={title} maxCount={RANGE_LIMITS.title.max}/>
                </Box>
                <Box component='div' sx={{margin:'30px 0' }}>
                <ReactQuill theme="snow" value={content} onChange={updateContent}/>
                <WordCount word={contentWithoutTags} maxCount={RANGE_LIMITS.content.max}/>
                </Box>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button disabled={!canPublish} xs={6} variant="contained" onClick={publishArticle}>Ready for Review</Button>
                    </Grid>
                    <Grid item>
                        <Button disabled={!canPublish} xs={6} variant="contained" color="secondary" onClick={saveArticle} >Save Draft</Button>
                    </Grid>
                </Grid>

            </Box>
           
        
        </>
    )

}

export default Editor;