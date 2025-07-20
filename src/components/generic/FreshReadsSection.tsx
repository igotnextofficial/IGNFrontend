import React from "react";
import { Typography,useTheme,
  useMediaQuery } from "@mui/material";

const styles = {
  section: {
    backgroundColor: "#111111",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    width: "100%",
    paddingLeft: "0.5rem",
    color: "#ffffff"
  },
  container: {
    width: "100%",
    margin: "0 auto"
 
  },
  heading: {
    fontSize: "2.6rem",
    fontWeight: "bold",
    marginBottom: "0.75rem"
  },
  paragraph: {
    color: "#d1d5db",
 
  }
};

const FreshReadsSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div style={styles.section}>
      <div style={styles.container}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{ color: '#fff', mb: 1 }}
        >
           Fresh Reads to Fuel Your Journey
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ color: '#ccc', mb: 4, maxWidth: isMobile ? '100%' : '600px', mx: 'auto' }}
        >
            Insights, tips, and real stories from mentors and rising stars in music and entertainment.
        </Typography>
  
      </div>
    </div>
  );
};

export default FreshReadsSection;
