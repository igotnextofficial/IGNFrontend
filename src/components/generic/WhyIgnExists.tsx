import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const WhyIgnExists = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Text Content */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
              Why <Box component="span" sx={{ color: "#f44336" }}>IGN</Box> exists
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
              We know how hard it is to break into creative industries without connections.
              IGN Mentorship is here to make expert advice and real opportunity accessible
              for everyone ready to grow.
            </Typography>
          </Grid>

          {/* Image Content */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/why-ign-photo.jpg"
              alt="Mentor speaking"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyIgnExists;
