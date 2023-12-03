import React from 'react';
import { Box, Typography, Stack, Divider, useTheme, useMediaQuery } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Import an icon for timestamp

// Define a type for the article prop
type Article = {
  title: string;
  category: string;
  timestamp: string;
};

// Define a type for the ArticleSideList props
type ArticleSideListProps = {
  articles: Article[];
};

const ArticleSideListComponent: React.FC<ArticleSideListProps> = ({ articles }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper',
      my: 2,
      p: 2,
      borderRadius: '8px',
      boxShadow: 2, // Slightly elevated shadow for depth
      overflow: 'hidden',
    }}>
      <Typography variant="h6" component="div" sx={{
        fontWeight: 'bold',
        color: theme.palette.secondary.main, // Use theme's secondary color
        mb: 1,
        fontFamily: 'Urbanist, sans-serif',
        fontSize: isMobile ? '1rem' : '1.25rem', // Responsive font size
      }}>
        The Latest
      </Typography>
      <Divider sx={{ bgcolor: theme.palette.secondary.main, mb: 2 }} />
      <Stack direction="column" spacing={2}>
        {articles.map((article, index) => (
          <Box key={index} sx={{
            transition: 'background-color 0.3s', // Smooth transition for hover effect
            '&:hover': {
              bgcolor: theme.palette.action.hover, // Use theme hover color
            },
            p: 1, // Padding inside each article box
          }}>
            <Typography variant="subtitle2" sx={{
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              textTransform: 'uppercase',
              fontSize: '0.875rem',
            }}>
              {article.category}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div" sx={{
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              fontFamily: 'Urbanist, sans-serif',
            }}>
              {article.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AccessTimeIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
              <Typography variant="caption" sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.75rem',
              }}>
                {article.timestamp}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ArticleSideListComponent;
