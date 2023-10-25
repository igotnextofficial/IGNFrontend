import { useContext  } from "react";
import { useParams } from "react-router-dom";

import ArticleProvider from "../../Providers/ArticleProvider"; 
import { ArticleContext } from "../../Contexts/ArticleContext";
import DisplayTextEditor from "../../components/Article/DisplayTextEditor";
import { FetchMode } from "../../types/ArticleFetchMode"; // types and enums
import Article from "../../Models/users/Article";


const EditArticle = () => {
    const{article_id} = useParams();


    const EditArticleComponent = ()=>{

        return (
            <DisplayTextEditor/>
        )
    }

   
    return (
        <ArticleProvider mode={FetchMode.DRAFTS} id={article_id}>
           <EditArticleComponent/>
        </ArticleProvider>
    )
    
}

export default EditArticle;