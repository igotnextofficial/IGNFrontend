import React, { useState, useEffect } from "react";
import IgnPillComponent from "../../Helpers/IgnPillComponent";


const FeatureArticleUIComponent = ({ article }) => {
  return (
    <div className="grid-container">
      <img src={article.image_url} alt={article.title} />
      <div className="grid-overlay-text">
        <span>
          <IgnPillComponent description={article.category} link={article.slug} />
          <h2>{article.title}</h2>
          <button className="read-more-btn">Read More</button>
        </span>
      </div>
    </div>
  );
};

const FeatureArticleComponent = () => {
  const articles = [
    {
      title: "Radiant Creativity Unveiled: Kristina Belle Takes Center Stage",
      slug: "/articles/georgie-reign-artist-of-the-month",
      image_url: "/images/singing.jpg",
      category: "Artist of the month",
    },
    {
      title: "Musiq Soulchild: Remembering when I had next!",
      slug: "",
      image_url: "/images/musiq.jpg",
      category: "Advice from a mentor",
    },
    {
      title: "Kayla and Johnny Heading on tour",
      slug: "",
      image_url: "/images/concert.jpg",
      category: "Entertainment News",
    },
    {
      title: "Top ten upcoming Artist 2023",
      slug: "",
      image_url: "/images/topartist.jpg",
      category: "Featured Artists",
    },
    {
      title: "Georgia Reign: The artist who will change the game",
      slug: "",
      image_url: "/images/reign.jpg",
      category: "Who's Next",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === articles.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [articles.length]);

  // Calculate the progress for the indicator
  const calculateProgress = () => {
    return ((currentIndex + 1) / articles.length) * 100;
  };

  return (
    <>
      <div id="featured-stories">
        <FeatureArticleUIComponent article={articles[currentIndex]} />
        <div className="indicator-container">
          <div
            className="progress-indicator"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default FeatureArticleComponent;
