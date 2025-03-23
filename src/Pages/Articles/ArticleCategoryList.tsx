import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ArticleContext } from "../../contexts/ArticleContext";
import ArticleProvider from "../../providers/ArticleProvider";
import { ArticleDataType, ListDataType } from "../../types/DataTypes";
import { Categories } from "../../types/ArticleFetchMode";
import { FetchMode } from "../../types/ArticleFetchMode";
import ArticleCategoryDisplay from "./ArticleCategoryDisplay";
import NoDataAvailable from "../../utils/NoDataAvailable";

const ArticleCategoryPrepareList = ({ category }: { category: string }) => {
    const { allArticles } = useContext(ArticleContext);
    const [articles, setArticles] = useState<ListDataType[] | null>(null);

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
        if (allArticles) {
            const convertedArticles = allArticles.map(convertToListData);
            setArticles(convertedArticles);
        }
    }, [allArticles]);

    return articles ? (
        <ArticleCategoryDisplay title={category.replaceAll("-", " ")} data={articles} />
    ) : (
        <NoDataAvailable />
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
