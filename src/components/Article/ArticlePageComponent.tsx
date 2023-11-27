import { useContext } from "react"
import { ArticleContext } from "../../Contexts/ArticleContext"
import { Box } from "@mui/material"

const ArticlePageComponent = () => {
    const {article} = useContext(ArticleContext)
    return(
        <>
            <h2>{article.title}</h2>
            <Box><img src={article.image_url}/></Box>
            <p>{article.content }</p>

            {/* //display similar articles */}
        </>
    )
}

export default ArticlePageComponent
