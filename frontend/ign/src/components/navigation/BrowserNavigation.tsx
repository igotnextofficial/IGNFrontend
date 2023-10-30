import { useState } from "react";
import { Grid, Typography } from "@mui/material"
import Ignlogo from '../../components/Ignlogo';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import MainPageList from "./MainPageList";



const BrowserNavigation = ()=> {

    const [isHovered, setIsHovered] = useState(false);
    const setColor = useState("");

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
        setIsHovered(false);
    }
     
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