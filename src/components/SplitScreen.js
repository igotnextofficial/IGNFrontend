import React from "react";
import { Grid } from "@mui/material";
const SplitScreen = (leftPane,rightPane) => {
    <Grid container component="main" sx={{ height:'100vh' }} spacing={2}>
    <CssBaseline/>
     <leftPane />
     <rightPane />

    </Grid>
}