import React from 'react';
import { Box, Typography,Chip } from '@mui/material';

interface UserBannerCardProps {
  image: string;
  title: string;
  subtitle: string;
  titleColor?: string; // fallback to default if not provided
  specialties?: { id: string; name: string }[]; // Assuming specialties is an array of objects with id and name
}

const UserBannerCard: React.FC<UserBannerCardProps> = ({
  image,
  title,
  subtitle,
  specialties = [],
  titleColor = '#f2c85b', // default to your suggested yellow/gold
}) => {
  return (
    <Box
      sx={{
        width: 350, 
        height: 500,
        position: 'relative',
        borderRadius: '5px',
        overflow: 'hidden',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: "inset 0px 6px 50px 20px rgba(0,0,0,0.5)",
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          px: 2,
          py: 1.5,
          background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: titleColor,
            fontWeight: 'bold',
            fontSize:'2.25rem', // 36px
            lineHeight: '1.3',
               background: 'linear-gradient(to top, #f2c85b, #fff1a6)', 
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
            textTransform: 'capitalize'
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#FBFAF9',
            fontWeight: 400,
            textTransform: 'capitalize',
            fontSize: '1.3rem', // 16px
          }}
        >
          {subtitle}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {specialties.slice(0, 4).map((specialty) => (
                          <Chip 
                            key={specialty.id} 
                            label={specialty.name} 
                            size="small"
                            sx={{
                              bgcolor: 'black',
                              color: 'white',
                              '&:hover': {
                                bgcolor: 'black',
                              }
                            }}
                          />
                        ))}
                      </Box>
      </Box>
    </Box>
  );
};

export default UserBannerCard;
