import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { ArticleDataType } from '../../types/DataTypes';
import { getArticleCategoryLabel } from '../../types/ArticleCategories';

const ArticleGridComponent = ({ articles } : {articles:ArticleDataType[]}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {articles.map((article, index) => (
        <Grid item xs={12} sm={6} key={index} sx={{ position: 'relative' }}>
          {/* Background Image */}
          <Box
            sx={{
              width: '100%',
              height: '300px',
              backgroundImage: `url(${article.image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: '0.3s ease-in-out',
              '&:hover': {
                opacity: 0.5,
                transform: 'scale(1.05)',
              },
            }}
          >
            {/* Redish Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(255, 0, 0, 0.5)', // Reddish overlay
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              {/* Logo in the center */}
              <Box
                component="img"
                src="https://localhost:3000/images/ign_logo.png" // Replace with the actual logo path
                alt="logo"
                sx={{ width: '80px', height: '80px', mb: 2 }} // Adjust the size of the logo
              />

              {/* Writer, Title, and Category */}
              <Typography
                variant="body2"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: '1rem',
                }}
              >
                {article.author.fullname} | {article.title} - {getArticleCategoryLabel(article.category)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleGridComponent;
