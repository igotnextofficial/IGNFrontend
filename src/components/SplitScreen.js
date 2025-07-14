import React from "react";
import { Grid } from "@mui/material";

const SplitScreen = (leftPane, rightPane) => {
    return (
        <Grid container component="main" sx={{ minHeight: '100vh', display: 'flex' }} spacing={2}>
            <CssBaseline/>
            <leftPane />
            <rightPane />
        </Grid>
    );
};

export default SplitScreen;