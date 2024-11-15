import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ArticleContext } from "../../contexts/ArticleContext";
import ArticleProvider from "../../providers/ArticleProvider";
import { ArticleDataType, ListDataType } from "../../types/DataTypes";
import { Categories } from "../../types/ArticleFetchMode";
import { FetchMode } from "../../types/ArticleFetchMode";
import ArticleCategoryDisplay from "./ArticleCategoryDisplay";
import NoDataAvailable from "../../utils/NoDataAvailable";
import InformationComponent from "../../helpers/InformationComponent";

const ArticleCategoryPrepareList = ({ category }: { category: string }) => {
    const { allArticles } = useContext(ArticleContext);
    const [articles, setArticles] = useState<ListDataType[] | null>(null); // Now using ListDataType

    // Function to convert ArticleDataType to ListDataType
    const convertToListData = (article: ArticleDataType): ListDataType => {
        return {
            id: article.id,
            title: article.title,
            image_url: article.image_url,
            content: article.content,
            author: article.author?.name || 'Unknown Author', // Assuming author has a `name` field
            category: article.category,
            link: `/articles/${article.category?.replaceAll(" ", "-")}/${article.id}` // Construct a link to the article page
        };
    };

    useEffect(() => {
        console.log(`the passed in list is ${allArticles}`);
        if (allArticles) {
            // Convert all articles to ListDataType format
            const convertedArticles = allArticles.map(convertToListData);
            setArticles(convertedArticles);
            // console.log("Converted Articles:", convertedArticles);
        } else {
            // console.log("No articles available");
        }
    }, [allArticles]);

    return articles ? (
        <>
            <ArticleCategoryDisplay title={category.replaceAll("-", " ")} data={articles} />
        </>
    ) : (
        <>
                <InformationComponent title={category.replaceAll("-", " ")}>
           <NoDataAvailable/>
           </InformationComponent>
        </>
    );
};

const ArticleCategoryList = () => {
    const { category } = useParams();

    return (
        <>
            <ArticleProvider mode={FetchMode.CATEGORY} category={category as Categories}>
                <div>
                    <ArticleCategoryPrepareList category={category as string} />
                </div>
            </ArticleProvider>
        </>
    );
}

export default ArticleCategoryList;
