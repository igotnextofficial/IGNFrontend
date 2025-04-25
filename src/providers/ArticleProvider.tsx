import { ReactNode,useState,useEffect,useMemo } from "react";
import { ArticleDataType, HttpMethods } from "../types/DataTypes";
import Article from "../models/users/Article";
import { ArticleContext } from "../contexts/ArticleContext";
import { FetchMode,Categories } from "../types/ArticleFetchMode";
import LocalStorage from "../storage/LocalStorage";
import useFetch from "../customhooks/useFetch";
import { APP_ENDPOINTS } from "../config/app";
// import { mockArticles } from "../data/mockArticles";

interface ArticleProviderProps {
    children: ReactNode;
    mode: FetchMode;
    id?: string; // Optional, required for SINGLE, USER, DRAFTS modes
    category?:Categories
}

const ArticleProvider: React.FC<ArticleProviderProps> = ({ children, mode, id="",category="" }) => {
    const endpoints = {
        [FetchMode.FEATURED]: APP_ENDPOINTS.ARTICLES.FEATURED,
        [FetchMode.ALL]: APP_ENDPOINTS.ARTICLES.ALL,
        [FetchMode.SINGLE]: `${APP_ENDPOINTS.ARTICLES.SINGLE}/${id}`,
        [FetchMode.USER]: `/${APP_ENDPOINTS.ARTICLES.USER}/${id}`,
        [FetchMode.DRAFTS]: `${APP_ENDPOINTS.ARTICLES.DRAFTS}/${id}`,
        [FetchMode.CATEGORY]: `${APP_ENDPOINTS.ARTICLES.CATEGORY}/${category}`
    }

    const [userArticles, setArticles] = useState<ArticleDataType>(Article.defaultResponse);
    const [articleList, setArticleList] = useState<ArticleDataType[] | null>([]);
    const [error, setError] = useState<Error | null>(null);
    const {data, loading, responseStatus, setSendRequest, fetchData} = useFetch({method:"GET"});
    const local_storage = new LocalStorage();
    
    useEffect(() => {
        const retrieveData = async () => { 
            let response = await fetchData(endpoints[mode], HttpMethods.GET, {}, "{}");
            return response;
        }

        retrieveData();
    }, [category, id]);

    useEffect(() => {
        if(data) {
            const articles = data['data'];
            if(mode === FetchMode.FEATURED) {
                if(local_storage.hasItem("featured:articles")) {
                    setArticleList(articles);
                } else {
                    setArticleList(articles);
                }
            } else {
                id !== "" ? setArticles(articles) : setArticleList(articles);
            }
        } 
        // Commenting out mock articles usage in development mode
        // else if (process.env.NODE_ENV !== 'production') {
        //     // Use mock data in development when no API data is available
        //     if (mode === FetchMode.FEATURED) {
        //         setArticleList(mockArticles);
        //     } else if (id !== "") {
        //         const singleArticle = mockArticles.find(article => article.id === id) || Article.defaultResponse;
        //         setArticles(singleArticle);
        //     } else {
        //         setArticleList(mockArticles);
        //     }
        // }

        if(responseStatus === 401) {
            setError(new Error("Unauthorized request"));
        }
    }, [mode, data, category, id]);
    
    return (
        <ArticleContext.Provider value={{ article: userArticles, error, allArticles: articleList }}>
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


