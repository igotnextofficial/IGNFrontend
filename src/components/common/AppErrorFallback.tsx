import React from "react";
import { Box, Button, Typography } from "@mui/material";
import * as Sentry from "@sentry/react";

const AppErrorFallback = () => {
    const handleReload = () => {
        window.location.reload();
    };

    const handleReport = () => {
        Sentry.showReportDialog();
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 2,
                px: 3
            }}
        >
            <Typography variant="h5" component="h1">
                Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary">
                We ran into an unexpected error. Please try reloading the page or send us a quick report.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                <Button variant="contained" color="primary" onClick={handleReload}>
                    Reload
                </Button>
                <Button variant="outlined" color="primary" onClick={handleReport}>
                    Report this issue
                </Button>
            </Box>
        </Box>
    );
};

export default AppErrorFallback;

