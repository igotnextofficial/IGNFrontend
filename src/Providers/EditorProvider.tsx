import { ReactNode, useEffect, useState } from "react"
import { ArticleCategories } from "../Types/ArticleCategories"
import { EditorFormContext } from "../Contexts/EditorFormContext"
import { ArticleSavedDataType } from "../Types/DataTypes"
import Article from '../Models/Users/Article'
interface EditorProviderProps {
    children:ReactNode
}

interface formData {
   [key:string]: any
}
const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
    const [data,setData] = useState<ArticleSavedDataType>(Article.defaultEmptyArticle)

    
    useEffect(() => {
        console.log("The data was updated")
        console.table(data)
    },[data])



    const updateData = (key: string, value : File | string) => {
        if (value instanceof File){
            updateFileData(key,value)
        }
        else{
            updateTextData(key,value)
        }
    }
      const updateFileData = (key: string, value:File) => {
        setData( prev => ({
            ...prev,
            [key]:value
        }))
      }

      const updateTextData = (key: string, value:string) => {
        setData( prev => ({
            ...prev,
            [key]:value
        }))
      }



    return (
        <EditorFormContext.Provider value={{data,updateData:updateData}}>
            { children }
        </EditorFormContext.Provider>
    )

}

export default EditorProvider