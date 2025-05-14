import React from 'react';
import { Box, Typography, Chip, Paper } from '@mui/material';

interface Category {
  id: string;
  name: string;
  slug: string;
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
}

interface UserCategoriesDisplayProps {
  categories: Category[];
}

const UserCategoriesDisplay: React.FC<UserCategoriesDisplayProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        mb: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
        Categories & Specialties
      </Typography>
      
      {categories.map((category) => (
        <Box key={category.id} sx={{ mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 1, 
              fontWeight: 500,
              color: 'primary.main'
            }}
          >
            {category.name}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {category.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                size="small"
                sx={{
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default UserCategoriesDisplay; 