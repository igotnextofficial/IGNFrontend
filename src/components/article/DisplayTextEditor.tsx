import { useState,useContext,useEffect,useLayoutEffect } from "react";
import { useParams,Navigate } from "react-router-dom";
import { ArticleDataType } from "../../types/DataTypes";
import ContentContainer from "../../utils/ContentContainer";
import DisplayArticleDrafts from "./DisplayAritcleDrafts";
import { Grid, Snackbar,Alert } from "@mui/material";
import Editor from "./Editor";
import Article from "../../models/users/Article";

import { ArticleContext } from "../../contexts/ArticleContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import useHttp from "../../customhooks/useHttp";
import { APP_ENDPOINTS } from "../../config/app";


const updateDraft = async(drafts:ArticleDataType[],updatedArticle:ArticleDataType) =>{
    let copiedDraft = [...drafts];
        
    if(drafts.length >= 10){
        copiedDraft.pop()    
    }

   return[
       updatedArticle,
        ...copiedDraft
    ];
 }   
const DisplayTextEditor = ()=> {
    
    //shared between both composing and editing of articles
    const currentArticleContext = useContext(ArticleContext); 
     const {updateError} = useContext(ErrorContext)
     const {post,put} = useHttp();
  

     const [updatedArticle, setUpdatedArticle] = useState<ArticleDataType>(Article.defaultResponse );
     const [willNeedRefresh,setWillNeedRefresh] = useState(false); 
     const [successfulUpdate,setSuccessfulUpdate] = useState(true)
    
     const {article_id} = useParams();
     const [articleId,setArticleId] = useState();
     const [ignore,setIgnore] = useState(true);
     const [drafts,setDrafts] = useState<ArticleDataType[]>
     (currentArticleContext.article.drafts || []);

     const [intialLoad,setIntialLoad] = useState(true);

    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success' as 'success' | 'error'
    });
  
    const showSnackbar = (message: string, severity: 'success' | 'error') => {
      setSnackbar({ open: true, message, severity });
    };
     const [editMode,setEditMode] = useState(false)     //
     useEffect(()=>{
        if(article_id && article_id !== ""){

            let recentChanges = updatedArticle.content !== "" ? updatedArticle : currentArticleContext.article;
             setUpdatedArticle(recentChanges);
            
         
        }


       
     }, [article_id])

 



     useEffect(()=>{
        // if saving an article fails 
 
            if(!successfulUpdate){ // if false
                let copiedDraft = [...drafts];
                copiedDraft.shift();
                setDrafts(copiedDraft);
            }


        return () => {
            // reset the state of the article context
            setSuccessfulUpdate(true)
        }
        
     },[drafts, successfulUpdate])

 
    
      
      const handleSaveDraft = async (data:ArticleDataType)=>{
        setUpdatedArticle(data)
        try{
            console.log("Saving draft",data)
            let response = null;
            
            const recent_drafts = await updateDraft(drafts,data);
            
            if( article_id && article_id !== ""){
                const update_url = APP_ENDPOINTS.ARTICLES.UPDATE.replace(":id",article_id || "");
                response = await put(update_url, data);
              

            }else{
          
                const creation_url = APP_ENDPOINTS.ARTICLES.CREATE;
                response = await post(creation_url, data);
            }
            const success_responses = [200,201];
            if(!response || !(success_responses.includes(response.status))){
                console.log(`faliling because response is ${response} and status is ${response?.status}`);
                throw new Error("Failed to save article draft");
          

            }

            setDrafts(recent_drafts);
            setArticleId(response.data.id);
            setSuccessfulUpdate(true)
            setWillNeedRefresh(true);
        
        }
        catch(e){
              showSnackbar("We ran into an error attempting to save your article, please try again.",'error');
             setSuccessfulUpdate(false)
        }


    }


    // const handleReadyForReview = () => {}
    


    const ShowDrafts = () => {
        return drafts.length === 0 ? <></> : (
            <Grid item xs={12} md={3}>
            <DisplayArticleDrafts article_drafts={drafts || []} updatedArticle={setUpdatedArticle} /> 
        </Grid>
        )
    }



    return (
        <>
        {willNeedRefresh &&(
            <Navigate to={`/edit-article/${articleId}`} replace={true} />
        )}
        <ContentContainer>
           
          
            
            <Grid container spacing={3}  >
                <Grid item xs={12} md={drafts.length === 0 ? 12 : 9}>
                <Editor handleDraft={handleSaveDraft} />

                </Grid>
            <ShowDrafts/>
            </Grid>

            <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  >
                    <Alert
                      onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                      severity={snackbar.severity}
                      sx={{ width: '100%' }}
                    >
                      {snackbar.message}
                    </Alert>
                  </Snackbar>
        </ContentContainer>
        </>
    )
}

export default DisplayTextEditor