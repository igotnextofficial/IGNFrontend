import React, { Children } from "react";
import Grid from "@mui/material/Grid";

const BackgroundCoverImage = ({ 
     url = "",
     xs = false,
     sm = 4,
     md = 7,
     sx={},
     children
    }) => {

    const originStyles={
        backgroundImage: `url(/images/${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: '0 50%',
    };

    const combinedStyles = {
        ...originStyles,
        ...sx
    }
    return url ? (
        <Grid
                      
            item
            xs={xs}
            sm={sm}
            md={md}
            sx={combinedStyles}>{children}</Grid>
    ) : null;

}
export default BackgroundCoverImage;