import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArticleContext } from "../../contexts/ArticleContext";
import { Box, Grid, Typography, Button, Skeleton, Fade } from "@mui/material";
import ArticleProvider from "../../providers/ArticleProvider";
import { FetchMode } from "../../types/ArticleFetchMode";
import { ArticleDataType } from "../../types/DataTypes";
import ArticleCard from './ArticleCard';
import LoadingComponent from "../../components/common/LoadingComponent";
import ArticleContentDisplay from "./ArticleContentDisplay";

const ArticlePageComponent = () => {
    const { article_id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Initial loading state
        const timer = setTimeout(() => {
            setIsLoading(false);
            setShowSkeleton(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const FeaturedArticleList = () => {
        const { allArticles } = useContext(ArticleContext);
        const [articles, setArticles] = useState<ArticleDataType[] | null>(null);

        useEffect(() => {
            if (allArticles) {
                const filterOutCurrentArticle = allArticles.filter((article) => article.id !== article_id);
                setArticles(filterOutCurrentArticle.slice(0, 3));
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
                setArticles(filterOutCurrentArticle.slice(0, 4));
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
        const { article, loading: articleLoading } = useContext(ArticleContext);

        useEffect(() => {
            if (!articleLoading && article && showSkeleton) {
                const timer = setTimeout(() => {
                    setShowSkeleton(false);
                    setTimeout(() => {
                        setShowContent(true);
                    }, 100);
                }, 1500);
                return () => clearTimeout(timer);
            }
        }, [articleLoading, article, showSkeleton]);

        if (isLoading) {
            return <LoadingComponent />;
        }

        if (showSkeleton) {
            return (
                <Fade in={showSkeleton} timeout={500}>
                    <Box sx={{ p: 3 }}>
                        {/* Article Header Skeleton */}
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                                    <Skeleton variant="text" width="80%" height={60} sx={{ mb: 2 }} />
                                    <Skeleton variant="circular" width={80} height={80} sx={{ mb: 2 }} />
                                    <Skeleton variant="text" width="60%" height={30} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
                            </Grid>
                        </Grid>

                        {/* Article Content Skeleton */}
                        <Box sx={{ mt: 4 }}>
                            {[...Array(6)].map((_, index) => (
                                <Skeleton key={index} variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                            ))}
                        </Box>
                    </Box>
                </Fade>
            );
        }

        return (
            <Fade in={showContent} timeout={800}>
                <Box>
                    {article && <ArticleContentDisplay article={article} />}
                </Box>
            </Fade>
        );
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
        maxWidth: '3200px',
        margin: '0 auto',
        padding: '2rem',
    },
    readMore: {
        marginTop: '3rem',
        marginBottom: '2rem',
        fontWeight: 600,
    },
};

export default ArticlePageComponent;
