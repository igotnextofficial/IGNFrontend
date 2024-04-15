import { useState,useContext,useEffect,useLayoutEffect } from "react";
import { useParams,Navigate } from "react-router-dom";
import { ArticleDataType } from "../../Types/DataTypes";
import ContentContainer from "../../Utils/ContentContainer";
import DisplayArticleDrafts from "./DisplayAritcleDrafts";
import { Grid } from "@mui/material";
import Editor from "./Editor";
import Article from "../../Models/Users/Article";

import { ArticleContext } from "../../Contexts/ArticleContext";
import { ErrorContext } from "../../Contexts/ErrorContext";

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
  
     const [editMode,setEditMode] = useState(false)     //
     const [updatedArticle, setUpdatedArticle] = useState<ArticleDataType>(Article.defaultResponse );
     const [willNeedRefresh,setWillNeedRefresh] = useState(false); 
     const [successfulUpdate,setSuccessfulUpdate] = useState(true)
    
     const {article_id} = useParams();
     const [articleId,setArticleId] = useState();
     const [ignore,setIgnore] = useState(true);
     const [drafts,setDrafts] = useState<ArticleDataType[]>([])

     const [intialLoad,setIntialLoad] = useState(true);

  

     useLayoutEffect(()=>{
        if(article_id){

            let recentChanges = updatedArticle.content !== "" ? updatedArticle : currentArticleContext.article;
            setEditMode(true)
            setUpdatedArticle(recentChanges);
            
            if(drafts.length === 0){
                if(currentArticleContext){
                    setDrafts(currentArticleContext.article.drafts || [])
                }
            
            }
        }


       
     }, [article_id, updatedArticle, currentArticleContext, drafts.length])

     useEffect(()=>{
        setIntialLoad(false)
     },[])




     useEffect(()=>{
        if(!intialLoad){
            if(!successfulUpdate){
                let copiedDraft = [...drafts];
                copiedDraft.shift();
                setDrafts(copiedDraft);
                setSuccessfulUpdate(true)
            }
        }

     },[drafts, intialLoad, successfulUpdate])

      useEffect(()=>{
        const article = new Article();

        const makeUpdate = async ()=>{
        
            setDrafts(await updateDraft(drafts,updatedArticle));
            const response = editMode
            ? await article.createOrUpdate(updatedArticle,article_id)
            : await article.createOrUpdate(updatedArticle)
            
            if(response)
            {
             
                setArticleId(response.data.id);

                if (!editMode) {
                    setWillNeedRefresh(true);
                  }
                  setSuccessfulUpdate(true)
            }
            else{
                updateError("We ran into an error attempting to save your article, please try again.")
                setSuccessfulUpdate(false)
            } 
              
        }

        
        
        if (!ignore) {
             makeUpdate();
        }
        
        return ()=>{
  
            setIgnore(true)
        }
        
      },[article_id, editMode, ignore, drafts, updateError, updatedArticle])
    
      
      const handleSaveDraft = (data:ArticleDataType)=>{
        setIgnore(false)
        setUpdatedArticle(data)


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
        </ContentContainer>
        </>
    )
}

export default DisplayTextEditor