import { createContext } from "react";
import { ArticleDataType } from "../Types/DataTypes";
import Article from "../Models/Users/Article";
interface ArticleContextState {
    article: ArticleDataType,
    allArticles?:ArticleDataType[] | null,
    error: Error | null,
    id?: string
}
  
export const ArticleContext = createContext<ArticleContextState>(
    {
        article:Article.defaultResponse,
        error:null,
    }
    );