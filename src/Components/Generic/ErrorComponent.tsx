import {Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import ErrorIcon from '@mui/icons-material/Error';
import {Grid} from "@mui/material";
import { ErrorContext } from "../../contexts/ErrorContext";


const ErrorComponent = () =>{
       const { error  } =  useContext(ErrorContext);
    useEffect(() => {
        console.log("error message changed")
        console.log(error)
    }, [error])
  
    return (
        
       error.length > 0 &&  <>
        
                <Grid container spacing={2} sx={styles.errorHolder} justifyContent={'center'} >
                    <Grid item  sx={{textAlign:"right"}}>
                       <ErrorIcon fontSize="medium" htmlColor="white"/>
                    </Grid>
                    <Grid item>
              
                            <Typography sx={{color:"#fff",fontSize:'20px'}}>{error}</Typography>
                    </Grid>
                </Grid>
           
        </>
    ) 
}


const styles = {
    'errorHolder': {
        position:"relative",
        backgroundColor: "#6b7a8c",
        padding:"10px",
        zIndex:"99999999999"
        
 
    },
    
    'errorDisplay': {
        position: "absolute",
        color: 'white',
        top: '50%', /* Vertical centering */
        left: '50%', /* Horizontal centering */

        transform: "translate(-50%, -50%)", /* Center the element */
    }
    

}

export default ErrorComponent;