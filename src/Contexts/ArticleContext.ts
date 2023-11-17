import { createContext } from "react";
import { ArticleDataType } from "../types/DataTypes";
import Article from "../Models/Users/Article";
interface ArticleContextState {
    article: ArticleDataType;
    error: Error | null;
    id?: string
}
  
export const ArticleContext = createContext<ArticleContextState>(
    {
        article:Article.defaultResponse,
        error:null,
    }
    );