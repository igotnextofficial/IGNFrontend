import { ReactNode, useEffect, useState } from "react"
import { EditorFormContext } from "../contexts/EditorFormContext"
import { ArticleDataType } from "../types/DataTypes"
import Article from '../models/users/Article'
interface EditorProviderProps {
    children:ReactNode
}


const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
    const [data,setData] = useState<ArticleDataType>({} as ArticleDataType);

    

    useEffect(() => {
        console.log("EditorProvider data",data)
    },[data])

 
    const updateData = (key: string, value : File | string | Record<string,any>) => {
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

      const updateTextData = (key: string, value:string | Record<string,any>) => {
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