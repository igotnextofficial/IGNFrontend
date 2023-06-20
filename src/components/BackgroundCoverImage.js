import React from "react";
import Grid from "@mui/material/Grid";

const BackgroundCoverImage = ({url = ""}) => {

    return url ? (
        <Grid
                      
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: `url(/images/${url})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
        }}></Grid>
    ) : null;

}
export default BackgroundCoverImage;