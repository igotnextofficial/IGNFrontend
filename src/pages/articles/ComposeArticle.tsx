import { Box,Button } from "@mui/material";
import DisplayTextEditor from "../../components/Article/DisplayTextEditor";
import InformationComponent from "../../Helpers/InformationComponent";
import ErrorComponent from "../../components/Generic/ErrorComponent";
import { useContext, useEffect } from "react";
import { ErrorContext } from "../../Contexts/ErrorContext";


const ComposeArticle = () => {

    return(
        <>
            <Box sx={{padding:"2rem 2rem 0"}}>
             <InformationComponent title={"Compose Article"} ><></></InformationComponent>
             </Box>
             <DisplayTextEditor />
        </>
       
    )    
}

export default ComposeArticle;

