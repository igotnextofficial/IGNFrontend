import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ArticleContext } from "../../contexts/ArticleContext";
import ArticleProvider from "../../providers/ArticleProvider";
import { ArticleDataType, ListDataType } from "../../types/DataTypes";
import { Categories } from "../../types/ArticleFetchMode";
import { FetchMode } from "../../types/ArticleFetchMode";
import ArticleCategoryDisplay from "./ArticleCategoryDisplay";
import NoDataAvailable from "../../utils/NoDataAvailable";
import LoadingComponent from "../../components/common/LoadingComponent";
import { Box, Skeleton, Fade ,Container, Typography} from '@mui/material';

 

const NoArticles: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
          Fresh articles are on the way
        </Typography>
        <Typography color="text.secondary">
          We’re working on new articles right now. Check back soon.
        </Typography>
      </Box>
    </Container>
  );
};

 

const ArticleCategoryPrepareList = ({ category }: { category: string }) => {
    const { allArticles } = useContext(ArticleContext);
    const [articles, setArticles] = useState<ListDataType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const convertToListData = (article: ArticleDataType): ListDataType => {
        return {
            id: article.id,
            title: article.title,
            image_url: article.image_url,
            content: article.content,
            author: article.author?.name || 'Unknown Author',
            category: article.category,
            link: `/articles/${article.category?.replaceAll(" ", "-")}/${article.id}`
        };
    };

    useEffect(() => {
        // Initial loading state
        const timer = setTimeout(() => {
            setIsLoading(false);
            setShowSkeleton(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (allArticles) {
            const convertedArticles = allArticles.map(convertToListData);
            setArticles(convertedArticles);
            
            // Add delay before showing content
            if (showSkeleton) {
                const timer = setTimeout(() => {
                    setShowSkeleton(false);
                    setTimeout(() => {
                        setShowContent(true);
                    }, 100);
                }, 1500);
                return () => clearTimeout(timer);
            }
        }
    }, [allArticles, showSkeleton]);

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (showSkeleton) {
        return (
            <Fade in={showSkeleton} timeout={500}>
                <Box sx={{ p: 3 }}>
                    {/* Category Title Skeleton */}
                    <Box sx={{ mb: 4 }}>
                        <Skeleton variant="text" width="40%" height={60} sx={{ mb: 2 }} />
                    </Box>

                    {/* Article Grid Skeleton */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                        {[...Array(6)].map((_, index) => (
                            <Box key={index}>
                                <Skeleton variant="rectangular" height={200} sx={{ mb: 2, borderRadius: 2 }} />
                                <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
                                <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
                                <Skeleton variant="text" width="80%" height={20} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Fade>
        );
    }

    return (
        <Fade in={showContent} timeout={800}>
            <Box>
                {articles  && articles.length > 0? (
                    <ArticleCategoryDisplay title={category.replaceAll("-", " ")} data={articles} />
                ) : (
                    <NoArticles />
                )}
            </Box>
        </Fade>
    );
};

const ArticleCategoryList = () => {
    const { category } = useParams();

    return (
        <ArticleProvider mode={FetchMode.CATEGORY} category={category as Categories}>
            <ArticleCategoryPrepareList category={category as string} />
        </ArticleProvider>
    );
}

export default ArticleCategoryList;
