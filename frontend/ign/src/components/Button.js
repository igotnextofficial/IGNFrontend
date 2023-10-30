 import React from "react";
 import { Button } from "@mui/material";
 import { ThemeProvider, createTheme }from "@mui/material/styles";
 
const IGNButton = ({buttonLabel, ...rest}) => {



const theme = createTheme({

  palette: {
    primary: {
        main:'#f86e51',
        darker: '#ef4825'
    },

  },
});

    
        return (
            <ThemeProvider theme={theme}>
                <Button className="button" type="submit" variant="contained" sx={{ mt: 3, mb: 2,color:'white' }} {...rest}> {buttonLabel} </Button>
            </ThemeProvider>
        )
}

export default IGNButton;