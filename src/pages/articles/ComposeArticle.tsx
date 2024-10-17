import { Box } from "@mui/material";
import DisplayTextEditor from "../../components/article/DisplayTextEditor";
import InformationComponent from "../../helpers/InformationComponent";
import EditorProvider from "../../providers/EditorProvider";


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

