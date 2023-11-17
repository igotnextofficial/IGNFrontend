import { ArticleDataType } from "../../Types/DataTypes"
import DisplayArticle from "../DisplayArticles"
const ListArticlesComponent = ({articles} :{ articles:ArticleDataType[]} ) => 
{
    let output = articles.map((userArticle:ArticleDataType ,index:number) => {
        return <a href=""><DisplayArticle key={index}  article={userArticle}  /></a>
    })
   return  (
    <>
            {output}
    </>
    )
}

export default ListArticlesComponent;