import { ArticleDataType } from "../../types/DataTypes"
import DisplayArticle from "../DisplayArticles"
const ListArticlesComponent = (
    {
        articles
    }
    :
    {
        articles:ArticleDataType[] | []
    }
    ) => {
    let output = articles.map((userArticle, index) => {
        return <a href=""><DisplayArticle key={index}  { ...userArticle }  /></a>
    })
   return  (
    <>
            {output}
    </>
    )
}

export default ListArticlesComponent;