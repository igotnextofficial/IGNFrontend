import React, { useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';

const  DisplayTextComponent = ({ text } : {text:string}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <Grid sx={{ backgroundColor: "white", p: 2, borderRadius: 5, mt: 2, mb: 2, textAlign: 'center' }}>
      <Box sx={{
        position: 'relative',
        maxHeight: isExpanded ? 'none' : 100, // Adjust maxHeight for initial view
        overflow: 'hidden'
      }}>
        <Typography variant="body1" component="p" sx={{textAlign:'left'}}>
          {text}
        </Typography>
        {!isExpanded && (
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 30, // Gradient height
            backgroundImage: 'linear-gradient(to top, white, rgba(255,255,255,0))'
          }} />
        )}
      </Box>
      <Button onClick={toggleExpansion} sx={{
        mt: 1,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '20px',
        color: 'black',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#f8f8f8',
          borderColor: '#bbb'
        }
      }}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </Button>
    </Grid>
  );
};

export default DisplayTextComponent;
