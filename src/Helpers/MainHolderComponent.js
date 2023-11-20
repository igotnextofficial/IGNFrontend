import { Box } from "@mui/material";
const MainHolderComponent = ({children,alternate= false}) =>{
    const sectionStyles = alternate ?{...styles.spacing,...styles.alternateSectionHolder} : {...styles.spacing,...styles.sectionHolder}
    return(
    <Box sx={sectionStyles}>
        {children}
    </Box>
    )
}

const styles = {
    sectionHolder:{
        backgroundColor:"#f8f8f8",
        backgroundImage:"linear-gradient(180deg,#f8f8f8,#f3f3f3 )"
 
    },
    alternateSectionHolder:{
        backgroundColor:"#ffffff", 
  
    },
    spacing:{
        padding:"2rem 10rem"
    }
}
export default MainHolderComponent;