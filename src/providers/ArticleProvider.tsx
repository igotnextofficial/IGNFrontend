import { ReactNode,useState,useEffect } from "react";
import { ArticleDataType } from "../types/DataTypes";
import Article from "../models/users/Article";
import { ArticleContext } from "../contexts/ArticleContext";
import { FetchMode,Categories } from "../types/ArticleFetchMode";
import LocalStorage from "../storage/LocalStorage";

interface ArticleProviderProps {
    children: ReactNode;
    mode: FetchMode;
    id?: string; // Optional, required for SINGLE, USER, DRAFTS modes
    category?:Categories
  }
  
  const ArticleProvider: React.FC<ArticleProviderProps> = ({ children, mode, id="",category="" }) => {
    const [userArticles, setArticles] = useState<ArticleDataType >(Article.defaultResponse);
    const [articleList,setArticleList] = useState<ArticleDataType[] | null>(null)
    const [error, setError] = useState<Error | null>(null); // To handle any errors during fetching
  
    useEffect(() => {
      const article = new Article();
      
      const fetchArticles = async () => {
        const local_storage = new LocalStorage();
        try {
          let articles;
          switch (mode) {
            case FetchMode.ALL:
              articles = await article.retreiveAll(category);
              setArticleList(articles)
              break;
            case FetchMode.SINGLE:
              if (!id) throw new Error("An ID is required to fetch a single article");
              articles = await article.retrieveById(id); 
              break;
            case FetchMode.USER:
              articles = await article.retrieveByUser(id); 
              setArticleList(articles)
              break;
            case FetchMode.DRAFTS:
              if (!id) throw new Error("A user ID is required to fetch drafts");
              articles = await article.retrieveDraftsByArticle(id);
              break;
            case FetchMode.FEATURED:
              if(!local_storage.hasItem("featured_articles")){
                articles = await article.retrieveFeatured();
                setArticleList(articles);
                local_storage.save("featured_articles",articles);

              }
              else{
                // console.log("loading from local storage")
                articles = JSON.parse(local_storage.load("featured_articles"));
                setArticleList(articles);
              }
              break;
              
            // Handle other cases as needed
            default:
              throw new Error("Invalid fetch mode");
          }
          if(articles !== null){ setArticles(articles) }
          
        } catch (error) {
          if (error instanceof Error) {
            setError(error);
          } else {
            setError(new Error("An unexpected error occurred."));
          }
        }
      };

      fetchArticles();
    }, [mode, id,category]); 

    /**
     *  ================================ Thoughts ================================
     * Why not just return an article array whether it is one or many instead of having article and allArticles?
     * 
     */
  
    return (
      <ArticleContext.Provider value={{ article: userArticles, error ,allArticles: articleList }}>
        {children}
      </ArticleContext.Provider>
    );
  };
  
  export default ArticleProvider;