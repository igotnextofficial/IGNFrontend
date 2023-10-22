import { useContext  } from "react";
import { useParams } from "react-router";

import ArticleProvider from "../../Providers/ArticleProvider"; 
import { ArticleContext } from "../../Contexts/ArticleContext";
import DisplayTextEditor from "../../components/Article/DisplayTextEditor";
import { FetchMode } from "../../types/ArticleFetchMode"; // types and enums

const EditArticle = () => {
    const{article_id} = useParams();

    const EditArticleComponent = ()=>{

        const {articles,errors} = useContext(ArticleContext)
        return (
            <DisplayTextEditor
            editMode={true}
            article={articles}
        />
        )
    }

   
    return (
        <ArticleProvider mode={FetchMode.DRAFTS} id={article_id}>
           <EditArticleComponent/>
        </ArticleProvider>
    )
    
}

export default EditArticle;