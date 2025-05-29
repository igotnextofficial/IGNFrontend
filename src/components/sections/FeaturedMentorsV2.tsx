import React, { useEffect } from "react";
import { Grid,Typography,Box } from "@mui/material";
import MentorListSlideShow from "../common/MentorListSlideshow";
const FeaturedMentorsV2 = () => {
    return (
            <Box sx={{ 
              bgcolor: '#f5f5f5', 
              py: 8, 
              px: { xs: 4, md: 8 },
              borderRadius: 2,
              boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)'
            }}>
       <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid justifyContent={'center'} item xs={12} md={3}     sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
            <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontSize:'1.5em',
                    letterSpacing:'0.2em',
                    fontWeight: 'normal',
                    mb: 0,
                    color: 'black'
                  }}
                >
                  Meet Our Amazing
                </Typography>
                <Typography    variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize:'3.8em',
                    borderBottom: '1px dashed black',
                    mb: 2,
                    color: 'black'
                  }}
                >
                     Mentors
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ maxWidth: '800px',fontWeight:'normal' }}
                >
                  Learn from experienced professionals who are passionate about helping you succeed
                </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
                <MentorListSlideShow />
            </Grid>
        </Grid>
        </Box>
    );

 
}
export default FeaturedMentorsV2;