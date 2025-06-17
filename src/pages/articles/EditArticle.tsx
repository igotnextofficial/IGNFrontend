import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import ArticleProvider from "../../providers/ArticleProvider";
import InformationComponent from "../../helpers/InformationComponent"; 
import DisplayTextEditor from "../../components/article/DisplayTextEditor";
import { FetchMode } from "../../types/ArticleFetchMode"; // types and enums

import EditorProvider from "../../providers/EditorProvider";

const EditArticle = () => {
    const{article_id} = useParams();


    const EditArticleComponent = ()=>{

        return (
            <>
              <Box sx={{padding:"2rem 2rem 0"}}>
                <InformationComponent title={"Edit Article"} ><></></InformationComponent>
              </Box>
                <DisplayTextEditor/>
            </>
        )
    }

   
    return (
        <ArticleProvider mode={FetchMode.DRAFTS} id={article_id}>
            <EditorProvider>
                <EditArticleComponent/>
            </EditorProvider>
        </ArticleProvider>
    )
    
}

export default EditArticle;