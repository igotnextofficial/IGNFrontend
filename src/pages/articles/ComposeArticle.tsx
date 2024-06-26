import { Box } from "@mui/material";
import DisplayTextEditor from "../../Components/Article/DisplayTextEditor";
import InformationComponent from "../../Helpers/InformationComponent";
import EditorProvider from "../../Providers/EditorProvider";


const ComposeArticle = () => {

    return(
        <>
         <EditorProvider>
            <Box sx={{padding:"2rem 2rem 0"}}>
             <InformationComponent title={"Compose Article"} ><></></InformationComponent>
             </Box>
             <DisplayTextEditor />
        </EditorProvider>
        </>
       
    )    
}

export default ComposeArticle;

