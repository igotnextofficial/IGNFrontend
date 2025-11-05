import { createContext, useContext } from "react";

import { ArticleDataType } from "../types/DataTypes";

export type EditorArticleState = ArticleDataType & {
    image?: File | null;
    [key: string]: unknown;
};

interface EditorFormContextState {
    data: EditorArticleState;
    updateData: (key: string, value: unknown) => void;
    resetData: (payload?: Partial<EditorArticleState>) => void;
}

export const EditorFormContext = createContext<EditorFormContextState | null>(null);

export const useEditorFormContext = () => {
    const context = useContext(EditorFormContext);
    if(!context){
        throw new Error("Editor form context must be within a provider.");
    }
    return context;
}
