
import { useParams } from "react-router-dom";

import { Box,Grid , Typography } from "@mui/material";
import ArticleProvider from "../../Providers/ArticleProvider";
import ContentContainer from "../../Utils/ContentContainer";
import { FetchMode } from "../../Types/ArticleFetchMode";
import ArticleSideListComponent from "./ArticleSideListComponent";
import { useTheme } from '@mui/material/styles';
const ArticlePageComponent = () => {
    const { article_id } = useParams();
    const ReadArticle = () => {
        // const { article } = useContext(ArticleContext);
        const article = {
            title:"Georgia Reign New Journey",
            content:"<p>Emerging from the vibrant streets of Atlanta, Georgia Reign has become the city's latest musical sensation. With a voice as warm as the southern sun and as powerful as the thunderstorms that roll off the Appalachian foothills, Georgia has captured the hearts of listeners everywhere.</p><p>Born Georgia Mae Reinhardt, she adopted the stage name 'Georgia Reign' to embody both her roots and the commanding presence she brings to her performances. Her music—a seamless blend of R&B, soul, and a hint of southern gospel—tells stories of love, life, and the resilience of the human spirit.</p><p>Georgia's debut album, 'Empress of the South,' is a tour de force of emotional depth and musical craftsmanship. The lead single, 'Sweet Magnolia Serenade,' has already climbed the charts, resonating with fans through its authentic storytelling and Georgia's heartfelt delivery.</p><p>Offstage, Georgia Reign is just as impactful. Her community work focuses on empowering young artists in the Atlanta area, and she's known for her workshops and motivational talks that inspire the next generation to find their voice and chase their dreams.</p><p>With a style reminiscent of the legendary soul divas of the past yet a sound that's entirely her own, Georgia Reign is more than just a singer—she's a force of nature. As she embarks on her first international tour, the world is poised to witness the rise of a new musical icon.</p>",
            date:"December 1, 2023",
            author:"Whitney Missy",
            imageUrl:"https://www.thisisrnb.com/wp-content/uploads/2012/12/GA-Reign.jpg"
        }
        const theme = useTheme();
        return (
   
            <ContentContainer>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
                <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: 'auto', borderRadius: theme.shape.borderRadius }} />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: theme.spacing(2), borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px` }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }}>{article.title}</Typography>
                    <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
                        Written By: {article.author} | {article.date}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ ...styles.content, padding: theme.spacing(3) }} dangerouslySetInnerHTML={{ __html: article.content }} />
        </ContentContainer>
        );
    }

    return (
        <Box sx ={styles.articleContainer}>
        <Grid container justifyContent={"center"} spacing={3}>
            <Grid item>
                <ArticleProvider mode={FetchMode.SINGLE} id={article_id}>
                    <ReadArticle />
                </ArticleProvider>      
            </Grid>
            <Grid item>
            <ArticleSideListComponent articles={[
            { 
                title: "'House of the Dragon': It's Dragons Versus Dragons in Season 2 Teaser", 
                category:"Entertainment",
                timestamp: '6 hours ago' 
            },
            { 
                title: "Michelle Nunez She Got Next!", 
                category:"Who's Next",
                timestamp: '8 hours ago' 
            },
            // ... more articles ...
            ]} />
         </Grid>
        </Grid>
        <Box>
        <Typography  variant="h5">More Content</Typography>
        </Box>
  
        </Box>

    );
}

const styles = {
    articleContainer :{
        backgroundColor:"white",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
        maxWidth:"1320px",
        margin:"0 auto",
        padding:'2em'
    },
    title: {
        // Remove the leading dash '-', make it more modern by increasing font size
        lineHeight: "1.3rem",
        letterSpacing: "0.02rem",
        padding: "0.8rem 0",
        fontWeight: "bold",
        textAlign: "center", // Center align the title for a modern look
        fontSize: "2.5rem", // Larger font size for the title
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

    },

    authorDateContainer: {
        display: 'flex',
        justifyContent: 'center', // Center align the author and date
        alignItems: 'center',
        gap: '8px', // Add some space between author, separator, and date
        margin: '1rem 0', // Add margin above and below the author/date line
        color: 'gray',
        fontStyle: 'italic', // Italicize for a more elegant look
    },
};

export default ArticlePageComponent;
