import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import ArticleProvider from "../../Providers/ArticleProvider";
import InformationComponent from "../../Helpers/InformationComponent"; 
import DisplayTextEditor from "../../Components/Article/DisplayTextEditor";
import { FetchMode } from "../../Types/ArticleFetchMode"; // types and enums



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
           <EditArticleComponent/>
        </ArticleProvider>
    )
    
}

export default EditArticle;