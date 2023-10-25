import { useState,useContext,useEffect,useLayoutEffect } from "react";
import { useParams,Navigate } from "react-router-dom";
import { ArticleDataType } from "../../types/DataTypes";
import ContentContainer from "../../utils/ContentContainer";
import InformationComponent from "../../Helpers/InformationComponent";
import DisplayArticleDrafts from "./DisplayAritcleDrafts";
import { Grid } from "@mui/material";
import Editor from "./Editor";
import Article from "../../Models/users/Article";

import { ArticleContext } from "../../Contexts/ArticleContext";

const DisplayTextEditor = ({})=> {
    
    //shared between both composing and editing of articles

     const {article} = useContext(ArticleContext)
     const [editMode,setEditMode] = useState(false)     //
     const currentArticleContext = useContext(ArticleContext); 
     const [headline,setHeadline] = useState("Compose Article")
     const [updatedArticle, setUpdatedArticle] = useState<ArticleDataType>(Article.defaultResponse );
     const [willNeedRefresh,setWillNeedRefresh] = useState(false); 
     const {article_id} = useParams();
     const [articleId,setArticleId] = useState();
     const [ignore,setIgnore] = useState(true);
     const [drafts,setDrafts] = useState<ArticleDataType[]>([])
     const [successfulUpdate,setSuccessfulUpdate] = useState(true)
     const [intialLoad,setIntialLoad] = useState(true);

     const updateDraft = async() =>{
        let copiedDraft = [...drafts];
            
        if(drafts.length >= 10){
            copiedDraft.pop()    
        }
   
        setDrafts([
           updatedArticle,
            ...copiedDraft
        ]);
     }     

     useLayoutEffect(()=>{
        if(article_id){

            let recentChanges = updatedArticle.content !== "" ? updatedArticle : article;
            setEditMode(true)
            setHeadline("Edit Article")
            setUpdatedArticle(recentChanges);
            
            if(drafts.length === 0){
                if(currentArticleContext){
                    setDrafts(currentArticleContext.article.drafts || [])
                }
            
            }
        }


       
     })

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

     },[drafts])

      useEffect(()=>{
        const article = new Article();

        const makeUpdate = async ()=>{

            await updateDraft();
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
                   
                setSuccessfulUpdate(false)
            } 
              
        }

        
        
        if (!ignore) {
             makeUpdate();
        }
        
        return ()=>{
  
            setIgnore(true)
        }
        
      },[updatedArticle])
    
      
      const handleSaveDraft = (data:ArticleDataType)=>{
        setIgnore(false)
        setUpdatedArticle(data)


    }


    const handleReadyForReview = () => {}
    
    const ShowEditor = () => {
        return (
            <Editor
                article = { updatedArticle }
                handleDraft={handleSaveDraft}
                handleReview={handleReadyForReview}
            />
        )
    }



    return (
        <>
        {willNeedRefresh &&(
            <Navigate to={`/edit-article/${articleId}`} replace={true} />
        )}
        <ContentContainer>
           
            <InformationComponent title={headline} ><></></InformationComponent>
            
            <Grid container spacing={3}  >
                <Grid item xs={12} md={9}>
                    <ShowEditor/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <DisplayArticleDrafts article_drafts={drafts || []} updatedArticle={setUpdatedArticle}/> 
                </Grid>
            </Grid>
        </ContentContainer>
        </>
    )
}

export default DisplayTextEditor