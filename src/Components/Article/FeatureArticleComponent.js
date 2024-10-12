import React, { useState, useEffect, useContext } from "react";
import IgnPillComponent from "../../Helpers/IgnPillComponent";
import { ArticleContext } from "../../Contexts/ArticleContext";
import { Link } from "react-router-dom";


const FeatureArticleUIComponent = ({ article }) => {
  return (
    <div className="grid-container">
      <img src={article.image_url} alt={article.title} />
      <div className="grid-overlay-text">
        <span>
          <IgnPillComponent description={article.category} link={article.slug} />
          <h2>{article.title}</h2>
          <Link to={`/article/${article.category}/${article.id}`}>
          <button className="read-more-btn">Read More</button>
          </Link>
        </span>
      </div>
    </div>
  );
};

const FeatureArticleComponent = () => {
  const  { allArticles }  = useContext(ArticleContext);
  const [articles, setArticles] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if( allArticles && allArticles.length > 0){
      setArticles(allArticles);
    }
   
    
  },[allArticles])

  useEffect(() => {
 
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === articles.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [ articles.length]);

  // Calculate the progress for the indicator
  const calculateProgress = () => {
    return ((currentIndex + 1) / articles.length) * 100;
  };

  return (
    articles.length > 0 ? <>
      <div id="featured-stories">
        <FeatureArticleUIComponent article={articles[currentIndex]} />
        <div className="indicator-container">
          <div
            className="progress-indicator"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>
    </> : <></>
  );
};

export default FeatureArticleComponent;
