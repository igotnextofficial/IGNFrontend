import { createContext, useContext } from "react";
import { ArticleCategories } from "../Types/ArticleCategories";
import { ArticleDataType } from "../Types/DataTypes";


interface EditorFormContextState {

    updateData:(key:string,value:string | File) => void
    data:ArticleDataType
}

export const EditorFormContext = createContext<EditorFormContextState | null>(null) 


export const useEditorFormContext = () => {
    const context = useContext(EditorFormContext);
    if(!context){
        throw new Error("Editor form context must be within a provider.")
    }
    return context;
}