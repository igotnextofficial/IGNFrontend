import React from 'react';
import { Box, Typography, Stack, Divider, useTheme, useMediaQuery, Link } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Import an icon for timestamp
import { ArticleDataType } from '../../types/DataTypes';
import { getArticleCategoryLabel } from '../../types/ArticleCategories';
import { timeAgo } from '../../utils/helpers';
import { Link as RouterLink } from 'react-router-dom'; // Assuming you're using react-router for navigation

// Define a type for the ArticleSideList props
type ArticleSideListProps = {
  articles: ArticleDataType[];
  headline?: string;
};

// Utility function to format the category
const formatCategory = (category: string): string => {
  return category.toLowerCase().replace(/\s+/g, '-'); // Convert to lowercase and replace spaces with hyphens
};

const ArticleSideListComponent = ({ articles, headline = "Latest News" }: ArticleSideListProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      width: '100%',
      bgcolor: 'background.paper',
      my: 2,
      p: 2,
      borderRadius: '8px',
      boxShadow: 2, // Slightly elevated shadow for depth
      overflow: 'hidden',
    }}>
      <Typography variant="h6" component="div" sx={{
        fontWeight: 'bold',
        color: "#000000", // Use theme's secondary color
        mb: 1,
        fontFamily: 'Urbanist, sans-serif',
        fontSize: isMobile ? '1rem' : '1.25rem', // Responsive font size
      }}>
        {headline}
      </Typography>
      <Divider sx={{ bgcolor: "#000000", mb: 2 }} />
      <Stack direction="column" spacing={2}>
        {articles.map((article, index) => (
          <Box key={index} sx={{
            transition: 'background-color 0.3s', // Smooth transition for hover effect
            '&:hover': {
              bgcolor: theme.palette.action.hover, // Use theme hover color
            },
            p: 1, // Padding inside each article box
          }}>
            {/* Stack to align image and text side by side */}
            <Stack direction="row" spacing={2} alignItems="flex-start">
              {/* Image on the left */}
              <Box sx={{
                width: '80px',
                height: '80px',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0, // Ensure the image doesn't shrink
              }}>
                <img
                  src={article.image_url}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>

              {/* Article content on the right */}
              <Box>
                {/* Create a link to the article's page */}
                <Link
                  component={RouterLink}
                  to={`/articles/${formatCategory(article.category ? article.category : "")}/${article.id}`}
                  underline="none"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <Typography variant="subtitle2" sx={{
                    fontWeight: 'bold',
                    color: theme.palette.text.primary,
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                  }}>
                    {getArticleCategoryLabel(article.category)}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div" sx={{
                    fontWeight: 'bold',
                    color: theme.palette.text.primary,
                    fontFamily: 'Urbanist, sans-serif',
                  }}>
                    {article.title}
                  </Typography>
                </Link>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <AccessTimeIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                  <Typography variant="caption" sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.75rem',
                  }}>
                    {timeAgo(article.created_at as string)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ArticleSideListComponent;
