import { useEffect, useLayoutEffect, useState } from "react";
import { ArticleDataType } from "../../types/DataTypes";
import ContentContainer from "../../utils/ContentContainer";
import InformationComponent from "../../Helpers/InformationComponent";
import DisplayArticleDrafts from "./DisplayAritcleDrafts";
import { Grid } from "@mui/material";
import Editor from "./Editor";
import Article from "../../Models/users/Article";
import { useParams } from "react-router";
import { Navigate } from "react-router";
const DisplayTextEditor = (
    {
        editMode=false,
        article=Article.defaultResponse
        
    }:
    {
        editMode?:boolean,
        article?:ArticleDataType
    })=> {

    const [headline,setHeadline] = useState(editMode ? "Edit Article" : "Compose Article")
     const [updatedArticle, setUpdatedArticle] = useState<ArticleDataType>(Article.defaultResponse );
     const [articleId,setArticleId] = useState("");
     const [willNeedRefresh,setWillNeedRefresh] = useState(false); 
     const {article_id} = useParams();
     const [ignore,setIgnore] = useState(true);
     const [drafts,setDrafts] = useState<ArticleDataType[]>([])

     
     useLayoutEffect(()=>{
        if(article_id){
            setArticleId(article_id);
        }
       
     })

      useEffect(()=>{
        const article = new Article();
        const makeUpdate = async ()=>{
            const response = editMode
            ? await article.createOrUpdate(updatedArticle,articleId)
            : await article.createOrUpdate(updatedArticle)
            
            if(response)
            {
             
                setArticleId(response.data.id);
                if (!editMode) {
                    setWillNeedRefresh(true);
                  }
            }

            const {content} = updatedArticle
            const clean_content = content.replace(/<[^>]*>/g, '');
            const copyDraft = {
                ...updatedArticle,
                content:clean_content
            }
            console.log("copied")
            console.dir(copyDraft)
            setDrafts([
                ...drafts,
               copyDraft,
            
            ])
              
        }
        
        if (!ignore) {
            makeUpdate();
          }
          
      
   
        return ()=>{
            setIgnore(true)
        }
        
      },[editMode,updatedArticle])
    
      const handleSaveDraft = (data:ArticleDataType)=>{
        setIgnore(false)
        setUpdatedArticle(data)
    }
    const handleReadyForReview = () => {}
    
    const ShowEditor = () => {
        return (
            <Editor
                article = {article}
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
                <Grid item xs={12} md={8}>
                    <ShowEditor/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <DisplayArticleDrafts article_drafts={article.drafts || []}/> 
                </Grid>
            </Grid>
        </ContentContainer>
        </>
    )
}

export default DisplayTextEditor