import { ReactNode, useState, useEffect, useMemo } from "react";
import { ArticleDataType } from "../types/DataTypes";
import Article from "../models/users/Article";
import { ArticleContext } from "../contexts/ArticleContext";
import { FetchMode, Categories } from "../types/ArticleFetchMode";
import useHttp from "../customhooks/useHttp";
import { APP_ENDPOINTS } from "../config/app";
// import { mockArticles } from "../data/mockArticles";

interface ArticleProviderProps {
    children: ReactNode;
    mode: FetchMode;
    id?: string; // Optional, required for SINGLE, USER, DRAFTS modes
    category?:Categories
}

const ArticleProvider: React.FC<ArticleProviderProps> = ({ children, mode, id = "", category = "" }) => {
    const endpoints = useMemo(() => ({
        [FetchMode.FEATURED]: APP_ENDPOINTS.ARTICLES.FEATURED,
        [FetchMode.ALL]: APP_ENDPOINTS.ARTICLES.ALL,
        [FetchMode.SINGLE]: `${APP_ENDPOINTS.ARTICLES.SINGLE}/${id}`,
        [FetchMode.USER]: `/${APP_ENDPOINTS.ARTICLES.USER}/${id}`,
        [FetchMode.DRAFTS]: `${APP_ENDPOINTS.ARTICLES.DRAFTS.replace(':id',id)}`,
        [FetchMode.CATEGORY]: `${APP_ENDPOINTS.ARTICLES.CATEGORY}/${category}`,
    }), [id, category]);

    const [userArticles, setArticles] = useState<ArticleDataType>(Article.defaultResponse);
    const [articleList, setArticleList] = useState<ArticleDataType[] | null>([]);
    const [error, setError] = useState<Error | null>(null);
    const { get, loading: httpLoading, error: httpError, status } = useHttp();

    useEffect(() => {
        if (httpError) {
            setError(new Error(httpError));
        }
    }, [httpError]);

    useEffect(() => {
        let isMounted = true;
        const endpoint = endpoints[mode];

        if (!endpoint) {
            return () => {
                isMounted = false;
            };
        }

        const shouldAuthorize = [FetchMode.DRAFTS, FetchMode.USER].includes(mode);

        const fetchArticles = async () => {
            try {
                const response = await get(endpoint, { requiresAuth: shouldAuthorize });
                if (!isMounted) {
                    return;
                }

                const responseData = response?.data;
                const resolvedData = (responseData && typeof responseData === "object" && "data" in (responseData as Record<string, unknown>))
                    ? (responseData as Record<string, any>)["data"]
                    : responseData;

                if (Array.isArray(resolvedData)) {
                    setArticleList(resolvedData);
                } else if (resolvedData !== undefined && resolvedData !== null) {
                    setArticles(resolvedData as ArticleDataType);
                } else {
                    setArticleList([]);
                }
                setError(null);
            } catch (err: unknown) {
                if (!isMounted) {
                    return;
                }
                const message = err instanceof Error ? err.message : "Unable to fetch articles";
                setError(new Error(message));
                if ([FetchMode.SINGLE, FetchMode.DRAFTS].includes(mode)) {
                    setArticles(Article.defaultResponse);
                } else {
                    setArticleList([]);
                }
            }
        };

        fetchArticles();

        return () => {
            isMounted = false;
        };
    }, [mode, endpoints, get]);

    useEffect(() => {
        if (status === 401) {
            setError(new Error("Unauthorized request"));
        }
    }, [status]);
    
    return (
        <ArticleContext.Provider value={{ 
            article: userArticles, 
            error, 
            allArticles: articleList,
            loading: httpLoading
        }}>
            {children}
        </ArticleContext.Provider>
    );
};

export default ArticleProvider;


    /**
     *  ================================ Thoughts ================================
     * Why not just return an article array whether it is one or many instead of having article and allArticles?
     *  ================================ TODO: ================================
     *  Adjust how the data is stored in local storage to avoid overwriting the data and to ensure that the data is always available
     *  should also store individual articles in local storage in a structure similar to the featured articles under the domain-namespace
     */

