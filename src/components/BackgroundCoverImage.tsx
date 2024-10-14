import {ReactNode } from "react";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material";

const BackgroundCoverImage = (
    { 
        url = "",
        xs = false,
        sm = 4,
        md = 7,
        sx={},
        children
    }: 
    {
        url:string,
        xs?: false | number,
        sm?: false | number,
        md?: false | number,
        sx?:object,
        children?:ReactNode | string  
    }
    
    ) => {

    const originStyles={
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t: Theme) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
 