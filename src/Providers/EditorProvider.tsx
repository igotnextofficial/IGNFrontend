import { ReactNode, useState } from "react"
import { ArticleCategories } from "../Types/ArticleCategories"
import { EditorFormContext } from "../Contexts/EditorFormContext"
import { ArticleSavedDataType } from "../Types/DataTypes"
interface EditorProviderProps {
    children:ReactNode
}
const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [category,setCategory] = useState<ArticleCategories>(ArticleCategories.ENTERTAINMENT)
    const [image,setImage] = useState<File | null>(null)

    const updateData = (data:ArticleSavedDataType) =>{
        setTitle(data.title)
        setContent(data.content)
        setCategory(data.category)
        setImage(data.image)
    }
    return (
        <EditorFormContext.Provider value={{title,content,category,image,updateData:updateData}}>
            { children }
        </EditorFormContext.Provider>
    )

}