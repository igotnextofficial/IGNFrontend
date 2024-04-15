
import { Grid } from "@mui/material"
import Ignlogo from '../Ignlogo';
import MainPageList from "./MainPageList";



const BrowserNavigation = ()=> {



     
    return (
    <>
    <Grid container  alignItems={"center"} spacing={3}>
        <Grid item sx={{backgroundColor:'#cf1d1d',paddingRight:"24px"}}>
            <Ignlogo/>
        </Grid>
        <MainPageList/>


    </Grid>
    </>
    )
}

export default BrowserNavigation