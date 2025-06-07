import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArticleContext } from "../../contexts/ArticleContext";
import { Box, Grid, Typography, Container, Button, Skeleton, Fade } from "@mui/material";
import ArticleProvider from "../../providers/ArticleProvider";
import { FetchMode } from "../../types/ArticleFetchMode";
import ArticleSideListComponent from "./ArticleSideListComponent";
import { useTheme } from '@mui/material/styles';
import { ArticleDataType } from "../../types/DataTypes";
import DisplayArticleComponent from "./DisplayArticleComponent";
import ArticleCard from './ArticleCard';
import useHttp from "../../customhooks/useHttp";
import { APP_ENDPOINTS } from "../../config/app";
import CircularImage from "../../utils/CircularImage";
import LoadingComponent from "../../components/common/LoadingComponent";

const ArticlePageComponent = () => {
    const { article_id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
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
        const article_date = article?.created_at ? new Date(article.created_at).toLocaleDateString() : '';

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
                    {article && (
                        <>
                            <Grid container spacing={4} alignItems="center">
                                <Grid item xs={12} md={4}>
                                    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                                        <Typography variant="h3" sx={styles.title}>
                                            {article.title}
                                        </Typography>
                                        <span style={styles.seperator} />
                                        <CircularImage image={article.author.profile_photo_path || ""} size={80} />
                                        <Typography variant="subtitle1" sx={styles.authorDateContainer}>
                                            Written By: {article.author.fullname} | {article_date}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Box display="flex" justifyContent="center">
                                        <img
                                            src={article.image_url}
                                            alt={article.title}
                                            style={{
                                                width: '100%',
                                                maxHeight: '500px',
                                                objectFit: 'cover' as const,
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box 
                                className="articleContent" 
                                sx={{ ...styles.content, padding: theme.spacing(3) }} 
                                dangerouslySetInnerHTML={{ __html: article.content }} 
                            />
                        </>
                    )}
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
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 600,
        marginBottom: '1rem',
        textAlign: 'center',
    },
    seperator: {
        width: '50px',
        height: '2px',
        backgroundColor: '#fd2f30',
        margin: '1rem auto',
    },
    authorDateContainer: {
        color: '#666',
        marginTop: '1rem',
    },
    content: {
        marginTop: '2rem',
        lineHeight: 1.8,
        fontSize: '1.1rem',
    },
    readMore: {
        marginTop: '3rem',
        marginBottom: '2rem',
        fontWeight: 600,
    },
};

export default ArticlePageComponent;
