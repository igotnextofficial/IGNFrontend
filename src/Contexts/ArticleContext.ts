import { createContext } from "react";
import { ArticleDataType } from "../types/DataTypes";
interface ArticleContextState {
    articles: ArticleDataType[];
    error: Error | null;
    id?: string
}
  
export const ArticleContext = createContext<ArticleContextState | undefined>(undefined);