import { Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom";
const SigninOrRegister = () => {
  return (  <Grid container spacing={1} justifyContent={"center"} alignItems={"center"}>
        <Grid className="significant-button" item><Link to="/login"><Typography  sx={styles.login}>Log in</Typography></Link></Grid>
        <Grid item className="significant-button v2"><Link to="/register">Sign up</Link></Grid>
    </Grid>

  )
}

export default SigninOrRegister

const styles={
    login:{
  
    }
}