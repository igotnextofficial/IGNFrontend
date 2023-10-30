import { Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom";
const SigninOrRegister = () => {
  return (  <Grid container spacing={1} justifyContent={"center"} alignItems={"center"}>
        <Grid item><Link to="/login"><Typography  sx={styles.login}>Log in</Typography></Link></Grid>
        <Grid item><Link to="/register">Sign up</Link></Grid>
    </Grid>

  )
}

export default SigninOrRegister

const styles={
    login:{
        backgroundColor:"white",
        color:"#fd2f30",
        padding:" 5px 8px",
        borderRadius:"10px"
    }
}