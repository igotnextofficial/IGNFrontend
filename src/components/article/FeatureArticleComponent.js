import React, { useState, useEffect, useContext } from "react";
import IgnPillComponent from "../../helpers/IgnPillComponent";
import { ArticleContext } from "../../contexts/ArticleContext";
import { Link } from "react-router-dom";

const FeatureArticleUIComponent = ({ article }) => {
  return (
    <div className="grid-container">
      <img src={article.image_url} alt={article.title} />
      <div className="grid-overlay-text">
        <span>
          <IgnPillComponent description={article.category} link={article.slug} />
          <h2>{article.title}</h2>
          <Link to={`/articles/${article.category.replaceAll(" ", "-")}/${article.id}`}>
            <button className="read-more-btn">Read More</button>
          </Link>
        </span>
      </div>
    </div>
  );
};

const FeatureArticleComponent = () => {
  const { allArticles } = useContext(ArticleContext);
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (allArticles && allArticles.length > 0) {
      setArticles(allArticles);
    }
  }, [allArticles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === articles.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [articles.length]);

  // Handle previous and next slide navigation
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Calculate the progress for the indicator
  const calculateProgress = () => {
    return ((currentIndex + 1) / articles.length) * 100;
  };

  return articles.length > 0 ? (
    <>
      <div id="featured-stories">
        <FeatureArticleUIComponent article={articles[currentIndex]} />
        
        {/* Arrow controls */}
        <button className="prev-btn" onClick={handlePrevClick}>
          &#9664; {/* Left arrow symbol */}
        </button>
        <button className="next-btn" onClick={handleNextClick}>
          &#9654; {/* Right arrow symbol */}
        </button>

        <div className="indicator-container">
          <div
            className="progress-indicator"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Add CSS for the hover effect */}
      <style>{`
        #featured-stories {
          position: relative;
        }

        .prev-btn, .next-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          font-size: 2rem;
          padding: 0.5rem;
          cursor: pointer;
          z-index: 2;
          display: none; /* Initially hidden */
        }

        /* Show arrows when the user hovers over the featured stories section */
        #featured-stories:hover .prev-btn,
        #featured-stories:hover .next-btn {
          display: block;
        }

        .prev-btn {
          left: 10px;
        }
        .next-btn {
          right: 10px;
        }

        .prev-btn:hover, .next-btn:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </>
  ) : (
    <></>
  );
};

export default FeatureArticleComponent;
