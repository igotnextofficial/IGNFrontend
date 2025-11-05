import { ReactNode, useCallback, useMemo, useState } from "react";
import { EditorFormContext, EditorArticleState } from "../contexts/EditorFormContext";
import Article from '../models/users/Article';

interface EditorProviderProps {
    children:ReactNode
}

const createDefaultState = (): EditorArticleState => ({
    ...Article.defaultResponse,
    tags: Array.isArray(Article.defaultResponse.tags) ? [...Article.defaultResponse.tags] : [],
    image: null,
});

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
    const [data, setData] = useState<EditorArticleState>(createDefaultState());

    const updateData = useCallback((key: string, value: unknown) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }, []);

    const resetData = useCallback((payload: Partial<EditorArticleState> = {}) => {
        setData({
            ...createDefaultState(),
            ...payload,
        });
    }, []);

    const contextValue = useMemo(() => ({
        data,
        updateData,
        resetData,
    }), [data, updateData, resetData]);

    return (
        <EditorFormContext.Provider value={contextValue}>
            { children }
        </EditorFormContext.Provider>
    );
}

export default EditorProvider;
