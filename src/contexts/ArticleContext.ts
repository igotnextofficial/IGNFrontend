import { createContext } from "react";
import { ArticleDataType } from "../types/DataTypes";
import Article from "../models/users/Article";
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