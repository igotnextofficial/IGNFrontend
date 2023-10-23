import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ArticleDataType } from "../../types/DataTypes";
import ContentContainer from "../../utils/ContentContainer";
import InformationComponent from "../../Helpers/InformationComponent";
import DisplayArticleDrafts from "./DisplayAritcleDrafts";
import { Grid } from "@mui/material";
import Editor from "./Editor";
import Article from "../../Models/users/Article";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import { ArticleContext } from "../../Contexts/ArticleContext";
import { DnsTwoTone, Drafts } from "@mui/icons-material";
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

     },[drafts])

      useEffect(()=>{
        const article = new Article();
        const makeUpdate = async ()=>{
            const response = editMode
            ? await article.createOrUpdate(updatedArticle,article_id)
            : await article.createOrUpdate(updatedArticle)
            
            if(response)
            {
             
                setArticleId(response.id);
                if (!editMode) {
                    setWillNeedRefresh(true);
                  }
            }
            else{
                alert("there was an error,code to handle it please:")
                console.dir(response)
            } 
              
        }
        
        if (!ignore) {
            let copiedDraft = [...drafts];
            
            if(drafts.length >= 10){
                copiedDraft.pop()    
            }

            
            setDrafts([
               updatedArticle,
                ...copiedDraft
            ]);
            makeUpdate();
          }
          
          console.log(`Edit mode is: ${editMode}`)
   
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
                    <DisplayArticleDrafts article_drafts={drafts || []}/> 
                </Grid>
            </Grid>
        </ContentContainer>
        </>
    )
}

export default DisplayTextEditor