import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { ArticleDataType } from '../../types/DataTypes';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  article: ArticleDataType;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
      onClick={() => navigate(`/articles/${article.category}/${article.id}`)}
    >
      <CardMedia
        component="img"
        height="200"
        image={article.image_url}
        alt={article.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            textTransform: 'uppercase', 
            fontWeight: 600,
            color: '#fd2f30'
          }} 
          gutterBottom
        >
          {article.category}
        </Typography>
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {article.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
         <Typography variant="body2" color="text.secondary">
            By: {article.author.fullname}
          </Typography> 
          <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
            •
          </Typography> 
          <Typography variant="body2" color="text.secondary">
            {article.created_at ? "Published: "+ new Date(article.created_at).toLocaleDateString() : ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard; 