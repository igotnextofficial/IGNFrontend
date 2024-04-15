import { ReactNode,useState,useEffect } from "react";
import { ArticleDataType } from "../Types/DataTypes";
import Article from "../Models/Users/Article";
import { ArticleContext } from "../Contexts/ArticleContext";
import { FetchMode,Categories } from "../Types/ArticleFetchMode";


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
    }, [mode, id,category]); // Re-run the effect if 'mode' or 'id' changes
  
    // Depending on your design, you can either pass the articles down directly through the component's children or use a context to provide the articles deeper into the component tree.
  
    return (
      <ArticleContext.Provider value={{ article: userArticles, error ,allArticles: articleList }}>
        {children}
      </ArticleContext.Provider>
    );
  };
  
  export default ArticleProvider;