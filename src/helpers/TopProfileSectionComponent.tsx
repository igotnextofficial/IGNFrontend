import { Box } from "@mui/material"
import TextContentComponent from "./TextContentComponent"
import { listDisplayDataType } from "../types/DataTypes"
import ListDisplayComponent from "./ListDisplayComponent"



const Bio = ({bio}:{bio:string}) => {
    return(
    <Box sx={styles.bioHolder}>
        <TextContentComponent content={bio} />
    </Box>
    )
}

const TopProfileSectionComponent = ({user,bio = ""}:{user:listDisplayDataType,bio?:string}) => {
    return (
        <>
            <ListDisplayComponent data={user} size="large"/>
            {bio.trim() !== "" && <Bio bio={bio} />}
        </>
    )
}

export default TopProfileSectionComponent

const styles = {
    bioHolder:{
        backgroundColor: "lightgrey",
         padding: 2, 
         borderRadius: "5px", 
         marginTop: 2, 
         MarginBottom: 2
    }
}