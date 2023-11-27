import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ArticleContext } from "../../Contexts/ArticleContext";
import { Box, Typography } from "@mui/material";
import ArticleProvider from "../../Providers/ArticleProvider";
import ContentContainer from "../../Utils/ContentContainer";
import { FetchMode } from "../../Types/ArticleFetchMode";

const ArticlePageComponent = () => {
    const { article_id } = useParams();
    const ReadArticle = () => {
        const { article } = useContext(ArticleContext);

        return (
            <ContentContainer>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography sx={styles.title} variant="h5">{article.title}</Typography>
                   
                    <Box component="img" src={"https://www.thisisrnb.com/wp-content/uploads/2012/12/GA-Reign.jpg"} sx={styles.image} />
                    <Typography  sx={styles.content} color="text.secondary" variant="body2" style={{padding:"4px 8px"}}>
                    <Box sx={styles.content} dangerouslySetInnerHTML={{ __html: article.content }} />
                </Typography>
            
                </Box>
            </ContentContainer>
        );
    }

    return (
        <ArticleProvider mode={FetchMode.SINGLE} id={article_id}>
            <ReadArticle />
        </ArticleProvider>
    );
}

const styles = {
    title: {
        lineHeight: "1.7rem",
        letterSpacing: "0rem",
        padding: "0.4rem 0",
        textAlign: 'center'
    },
    content: {
        maxWidth: "800px",
        width: '100%', // Ensures the content takes the full width
        lineHeight: "1.7rem",
    },
    image: {
        width: '100%',
        maxWidth:"800px",
        height: 'auto', // Ensures the image scales correctly
        margin:"1em 0"

    }
};

export default ArticlePageComponent;
