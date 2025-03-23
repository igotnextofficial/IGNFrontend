import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArticleContext } from "../../contexts/ArticleContext";
import { Box, Grid, Typography, Container, Button } from "@mui/material";
import ArticleProvider from "../../providers/ArticleProvider";
import { FetchMode } from "../../types/ArticleFetchMode";
import ArticleSideListComponent from "./ArticleSideListComponent";
import { useTheme } from '@mui/material/styles';
import { ArticleDataType } from "../../types/DataTypes";
import DisplayArticleComponent from "./DisplayArticleComponent";
import ArticleCard from './ArticleCard';

const ArticlePageComponent = () => {
    const { article_id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const FeaturedArticleList = () => {
        const { allArticles } = useContext(ArticleContext);
        const [articles, setArticles] = useState<ArticleDataType[] | null>(null);

        useEffect(() => {
            if (allArticles) {
                const filterOutCurrentArticle = allArticles.filter((article) => article.id !== article_id);
                setArticles(filterOutCurrentArticle.slice(0, 3)); // Limit to 3 articles
            }
        }, [allArticles, article_id]);

        return articles ? (
            <Grid container spacing={3}>
                {articles.map((article) => (
                    <Grid item xs={12} md={4} key={article.id}>
                        <ArticleCard article={article} />
                    </Grid>
                ))}
            </Grid>
        ) : null;
    };

    const RecentStoriesList = () => {
        const { allArticles } = useContext(ArticleContext);
        const [articles, setArticles] = useState<ArticleDataType[] | null>(null);

        useEffect(() => {
            if (allArticles) {
                const filterOutCurrentArticle = allArticles.filter((article) => article.id !== article_id);
                setArticles(filterOutCurrentArticle.slice(0, 4)); // Limit to 4 articles
            }
        }, [allArticles, article_id]);

        return articles ? (
            <Grid container spacing={3}>
                {articles.map((article) => (
                    <Grid item xs={12} md={6} key={article.id}>
                        <ArticleCard article={article} />
                    </Grid>
                ))}
            </Grid>
        ) : null;
    };

    const ReadArticle = () => {
        const { article } = useContext(ArticleContext);
        const [currentArticle, setCurrentArticle] = useState<ArticleDataType | null>(null);
        const [article_date, setDate] = useState("");

        useEffect(() => {
            if (article) {
                setCurrentArticle(article);
                if (article.created_at) {
                    let current_article_date = new Date(article.created_at);
                    const formatted_date = current_article_date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    setDate(formatted_date);
                }
            }
        }, [article]);

        return currentArticle !== null ? (
            <Box>
                <Grid container>
                    <Grid item md={4} alignContent={'center'}>
                        <Typography variant="h3" sx={styles.title}>{currentArticle.title}</Typography>
                        <span style={styles.seperator} />
                        <Typography variant="subtitle1" sx={styles.authorDateContainer}>
                            Written By: {currentArticle.author.fullname} | {article_date}
                        </Typography>
                    </Grid>
                    <Grid item md={8}>
                        <img src={currentArticle.image_url} alt={currentArticle.title} style={styles.image} />
                    </Grid>
                </Grid>
                <Box 
                    className="articleContent" 
                    sx={{ ...styles.content, padding: theme.spacing(3) }} 
                    dangerouslySetInnerHTML={{ __html: currentArticle.content }} 
                />
            </Box>
        ) : null;
    };

    return (
        <Box sx={styles.articleContainer}>
            <ArticleProvider mode={FetchMode.SINGLE} id={article_id}>
                <ReadArticle />
            </ArticleProvider>

            <Typography sx={styles.readMore} variant="h5">READ MORE</Typography>
            <ArticleProvider mode={FetchMode.FEATURED} id={article_id}>
                <FeaturedArticleList />
            </ArticleProvider>

            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/articles')}
                    sx={{ 
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        bgcolor: "#fd2f30",
                        color: "#FBFAF9",
                        "&:hover": { 
                            bgcolor: "#d8090a" 
                        }
                    }}
                >
                    View All Articles
                </Button>
            </Box>

            <Typography sx={styles.readMore} variant="h5">Recent Stories</Typography>
            <ArticleProvider mode={FetchMode.FEATURED} id={article_id}>
                <RecentStoriesList />
            </ArticleProvider>
        </Box>
    );
};

const styles = {
    articleContainer: {
        backgroundColor: "white",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
        maxWidth: "1320px",
        margin: "0 auto",
        padding: '2em'
    },
    title: {
        lineHeight: "3rem",
        letterSpacing: "0.02rem",
        padding: "0.8rem 0",
        fontWeight: "normal",
        textAlign: "center",
        fontSize: "2.5rem",
    },
    content: {
        maxWidth: "1600px",
        width: '100%',
    },
    image: {
        width: '100%',
        maxWidth: "800px",
        height: 'auto',
        margin: "1em 0"
    },
    authorDateContainer: {
        display: 'flex',
        fontFamily: "Lato, sans-serif",
        fontWeight: 300,
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        margin: '0',
        color: 'gray',
        fontStyle: 'italic',
    },
    seperator: {
        display: 'block',
        width: '80%',
        borderTop: '1px dashed gray',
        margin: '0 auto 15px',
    },
    readMore: {
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
