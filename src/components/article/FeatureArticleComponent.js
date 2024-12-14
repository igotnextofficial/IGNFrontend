import React, { useContext,useState,useEffect } from "react";
import { ArticleContext } from "../../contexts/ArticleContext";
import { Link } from "react-router-dom";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const GridArticle = ({ article }) => (
  <Card sx={{ position: "relative", overflow: "hidden" , borderRadius:0,cursor:'pointer'}}>
    <CardMedia
      component="img"
      image={article.image_url}
      alt={article.title}
      sx={{ height: 400 }}
    />
    <CardContent
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderRadis:'0',
        background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 0) 100%)",
        color: "white",
        textAlign: "center",
      }}
    >
      <Button variant="contained" sx={{ bgcolor: "#fd2f30", color: "#FBFAF9", "&:hover": { bgcolor: "#d8090a" } }}>
          Read More
        </Button>
      <Typography  variant="subtitle1" sx={styles.title}>{article.title}</Typography>
    </CardContent>
  </Card>
);

const FeaturedArticle = ({ article }) => {
  const isMobile = useIsMobile(); // Check if the screen is mobile-sized

  // Dynamically set the image URL for the featured article
  const imageUrl = isMobile
    ? article.image_url.replace(".jpg", "_mobile.jpg")
    : article.image_url;

  return (
    <Card sx={{ position: "relative", mt: 0, mb: 15 }}>
      {/* Featured Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          padding: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: 30,
            fontWeight: "bold",
            lineHeight: "1",
            color: "#ff5722",
          }}
        >
          IGN
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: 10,
            textTransform: "uppercase",
            fontWeight: "bold",
            lineHeight: "1",
            color: "#333",
          }}
        >
          Exclusive
        </Typography>
      </Box>

      {/* Article Media */}
      <CardMedia
        component="img"
        image={imageUrl}
        alt={article.title}
        sx={{ height: 800 }}
      />

      {/* Article Content */}
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 0) 100%)",
          color: "white",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          {article.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {article.summary}
        </Typography>
        <Link
          to={`/articles/${article.category.replaceAll(" ", "-")}/${article.id}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#ffcc00", color: "black", "&:hover": { bgcolor: "#e6b800" } }}
          >
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const FeatureArticleComponent = () => {
  const { allArticles } = useContext(ArticleContext);
  if (allArticles === null || allArticles.length === 0) return null;

  const gridArticles = allArticles.slice(0, 4);
  const featuredArticle = allArticles[4];

  return (
    <Box sx={{ p: 0 }}>
      <Grid container spacing={0}>
        {gridArticles.map((article) => (
          <Grid item xs={6} sm={3} key={article.id}>
            <GridArticle article={article} />
          </Grid>
        ))}
      </Grid>

      {featuredArticle && <FeaturedArticle article={featuredArticle} />}
    </Box>
  );
};

const styles = {
  title: {
    fontSize: "1.2em",
    lineHeight: "1.2em",
    fontWeight: "bold",
    margin: "8px 0",
    color: "#FBFAF9",
    textShadow: "2px 5px 20px black",
    display: "flex",
    minHeight: "50px",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
};

export default FeatureArticleComponent;