import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import ErrorIcon from '@mui/icons-material/Error';
import {Grid} from "@mui/material";
import { ErrorContext } from "../../Contexts/ErrorContext";


const ErrorComponent = () =>{
       const{ error } =  useContext(ErrorContext);
       console.log(`The error is : ${error}`)
  
    return error.length > 0 ? (
        
        <>
        
                <Grid container spacing={2} sx={styles.errorHolder} justifyContent={'center'} >
                    <Grid item  sx={{textAlign:"right"}}>
                       <ErrorIcon fontSize="medium" htmlColor="white"/>
                    </Grid>
                    <Grid item>
              
                            <Typography sx={{color:"#333333"}}>{error}</Typography>
                    </Grid>
                </Grid>
           
        </>
    ) : <></>
}


const styles = {
    'errorHolder': {
        position:"relative",
        backgroundColor: "#6b7a8c",
        padding:"10px",
        zIndex:"99999"
        
 
    },
    
    // 'errorDisplay': {
    //     position: "absolute",
    //     color: 'white',
    //     top: '50%', /* Vertical centering */
    //     left: '50%', /* Horizontal centering */
    //     transform: "translate(-50%, -50%)", /* Center the element */
    // }
    

}

export default ErrorComponent;