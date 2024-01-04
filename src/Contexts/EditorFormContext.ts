import { createContext, useContext } from "react";
import { ArticleCategories } from "../Types/ArticleCategories";
import { ArticleSavedDataType } from "../Types/DataTypes";
interface EditorFormContextState {
    title:string;
    content:string;
    category:ArticleCategories;
    image:File | null;
    updateData:(data:ArticleSavedDataType) => void
}

export const EditorFormContext = createContext<EditorFormContextState | null>(null) 


export const useEditorFormContext = () => {
    const context = useContext(EditorFormContext);
    if(!context){
        throw new Error("Editor form context must be within a provider.")
    }
    return context;
}