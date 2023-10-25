import { ReactNode,useState,useEffect } from "react";
import { ArticleDataType } from "../types/DataTypes";
import Article from "../Models/users/Article";
import { ArticleContext } from "../Contexts/ArticleContext";
import { FetchMode } from "../types/ArticleFetchMode";

interface ArticleProviderProps {
    children: ReactNode;
    mode: FetchMode;
    id?: string; // Optional, required for SINGLE, USER, DRAFTS modes
  }
  
  const ArticleProvider: React.FC<ArticleProviderProps> = ({ children, mode, id="" }) => {
    const [userArticles, setArticles] = useState<ArticleDataType>(Article.defaultResponse);
    const [error, setError] = useState<Error | null>(null); // To handle any errors during fetching
  
    useEffect(() => {
      const article = new Article();
      
      const fetchArticles = async () => {
        try {
          let articles;
          switch (mode) {
            case FetchMode.ALL:
              articles = await article.retreiveAll();
              break;
            case FetchMode.SINGLE:
              if (!id) throw new Error("An ID is required to fetch a single article");
              articles = await article.retrieveById(id); 
              break;
            case FetchMode.USER:
              articles = await article.retrieveByUser(id); 
              break;
            case FetchMode.DRAFTS:
              if (!id) throw new Error("A user ID is required to fetch drafts");
              articles = await article.retrieveDraftsByArticle(id);
              break;
            // Handle other cases as needed
            default:
              throw new Error("Invalid fetch mode");
          }
          setArticles(articles);
        } catch (error) {
          if (error instanceof Error) {
            setError(error);
          } else {
            setError(new Error("An unexpected error occurred."));
          }
        }
      };
  
      fetchArticles();
    }, [mode, id]); // Re-run the effect if 'mode' or 'id' changes
  
    // Depending on your design, you can either pass the articles down directly through the component's children or use a context to provide the articles deeper into the component tree.
  
    return (
      <ArticleContext.Provider value={{ article: userArticles, error }}>
        {children}
      </ArticleContext.Provider>
    );
  };
  
  export default ArticleProvider;