import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArticleContext } from "../../contexts/ArticleContext";

import { Box,Grid , Typography } from "@mui/material";
import ArticleProvider from "../../providers/ArticleProvider";

import { FetchMode } from "../../types/ArticleFetchMode";
import ArticleSideListComponent from "./ArticleSideListComponent";
import { useTheme } from '@mui/material/styles';

import { ArticleDataType} from "../../types/DataTypes";
import DisplayArticleComponent from "./DisplayArticleComponent";
// const DisplayArticle = ({ article }: { article: ArticleDataType }) => {
//     const theme = useTheme();
//     return (
//         <ContentContainer>
//             <></>
//     </ContentContainer> 
//     )
// }

const ArticlePageComponent = () => {
    const { article_id } = useParams();

    const FeaturedArticleList = ( ) => {
       const {allArticles} = useContext(ArticleContext);
       const[articles,setArticles] = useState<ArticleDataType[] | null>(null)

         useEffect(() => {
              if(allArticles){
                const filterOutCurrentArticle = allArticles.filter((article) => article.id !== article_id)
                setArticles(filterOutCurrentArticle)
              }
         },[allArticles]);

         
         return articles ? (
            <Grid container spacing={0} sx={{ width: '100%' }}>
              {articles.map((article, index) => (
                <Grid item xs={12} md={6} key={index} sx={{ padding: 0 }}>
                    <Link to={`/articles/${article.category?.toLocaleLowerCase().replaceAll(" ","-")}/${article.id}`} style={{ textDecoration: 'none' }}>
                        <DisplayArticleComponent article={article} height={50} featured={false} />
                    </Link>
                </Grid>
              ))}
            </Grid>
          ) : (
            <></>
          );
    }


    const RecentStoriesList = ( ) => {
        const {allArticles} = useContext(ArticleContext);
        const[articles,setArticles] = useState<ArticleDataType[] | null>(null)
  
          useEffect(() => {
               if(allArticles){
                 const filterOutCurrentArticle = allArticles.filter((article) => article.id !== article_id)
                 setArticles(filterOutCurrentArticle)
               }
          },[allArticles])
        return  articles ? <ArticleSideListComponent articles={ articles} headline="Recent Stories"/> : <></>
    }



    const ReadArticle = () => {
        const { article} = useContext(ArticleContext);
        const [currentArticle, setCurrentArticle] = useState<ArticleDataType | null>(null);
        const [article_date, setDate] = useState("");
    
      
        useEffect(() => {
            if (article) {
              setCurrentArticle(article);
                if(article.created_at){
                    let current_article_date = new Date(article.created_at)
                    const formatted_date = current_article_date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })

                    setDate(formatted_date)


                }
                     


            }
        }, [article]);
        
        useEffect(() => {

        },[currentArticle])
        const theme = useTheme();
        return (

            currentArticle !== null ? <>
            <Box>
                <Grid container>
                    <Grid item md={4} alignContent={'center'}>
                    <Typography variant="h3" sx={styles.title}>{currentArticle.title}</Typography>
                    <span style={styles.seperator}/>
                        <Typography variant="subtitle1" sx={styles.authorDateContainer}>
                            Written By: {currentArticle.author.fullname} | {article_date}
                        </Typography>
                    </Grid>
                    <Grid item md={8}>
                        <img src={currentArticle.image_url} alt={currentArticle.title} style={styles.image} />
                    </Grid>
                </Grid>
                <Box className="articleContent" sx={{ ...styles.content, padding: theme.spacing(3) }} dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
              
            </Box>

            </>: <></> 
        );
    }

    return (
        <Box sx ={styles.articleContainer}>
                <ArticleProvider mode={FetchMode.SINGLE} id={article_id}>
                    <ReadArticle />
                </ArticleProvider>
                <Typography sx={styles.readMore} variant="h5">READ MORE</Typography>

                <ArticleProvider mode={FetchMode.FEATURED} id={article_id}>
                    <FeaturedArticleList/>
                </ArticleProvider>
           

                <ArticleProvider mode={FetchMode.FEATURED} id={article_id}>
                    <RecentStoriesList/>
                </ArticleProvider>

            
        
                
        {/* <Grid container justifyContent={"center"} spacing={2}>
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
        </Box> */}
  
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
        lineHeight: "3rem",
        letterSpacing: "0.02rem",
        padding: "0.8rem 0",
        fontWeight: "normal",
        textAlign: "center", // Center align the title for a modern look
        fontSize: "2.5rem", // Larger font size for the title
    },
    content: {
        maxWidth: "1600px",
        width: '100%', // Ensures the content takes the full width

    },

 
    image: {
        width: '100%',
        maxWidth:"800px",
        height: 'auto', // Ensures the image scales correctly
        margin:"1em 0"

    },

    authorDateContainer: {
        display: 'flex',
        fontFamily: "Lato, sans-serif",
        fontWeight: 300,
        // fontStyle: 'normal',
        
        justifyContent: 'center', // Center align the author and date
        alignItems: 'center',
        gap: '8px', // Add some space between author, separator, and date
        margin: '0', // Add margin above and below the author/date line
        color: 'gray',
        fontStyle: 'italic', // Italicize for a more elegant look
    },
    seperator: {
        display: 'block',
        width: '80%',
        borderTop:'1px dashed gray',
        margin: '0 auto 15px', // Add margin above and below the separator
    },
    readMore:{
        textAlign: 'center',
        margin: '2em 0',
        color: 'gray',
        fontWeight: 300,
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        padding: '0.5em 0',
        fontFamily: "Lato, sans-serif",
        fontStyle: 'italic',
    }
};

export default ArticlePageComponent;
