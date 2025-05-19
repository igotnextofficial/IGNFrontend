import { Box,Avatar } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import IgnPillComponent from "../../../helpers/IgnPillComponent";
import TextContentComponent from "../../../helpers/TextContentComponent";
import { ArtistDataType, MenteeDataType } from "../../../types/DataTypes";
import { useEffect } from "react";
import { text } from "stream/consumers";
import { Opacity } from "@mui/icons-material";
import { Typography } from "@mui/material";
const DisplayArtistComponent = ({mentee }: {mentee:MenteeDataType }) => {

    return (
        <>
            <Link to={`profile/mentee/${mentee.id}`} style={styles.linkWrapper}>
                <Box sx={styles.mainContainer} >
                    <Box sx={styles.container}>
                        <Avatar className="display-image-list-ign" src={mentee.profile_photo_path} alt={mentee.fullname} sx={{width:250, height:250}} />
                        <Box sx={styles.pillHolder}>
                            {/* < Typography sx={{backgroundColor:"#ebd805",padding:"5px 8px", borderRadius:"3px",textWrap:"nowrap"}} variant="subtitle1" >{'musician'} </Typography> */}
                        </Box>
                    </Box>
                    <Box>
                        <TextContentComponent content={mentee.fullname} />
                    </Box>
            
                </Box>
            </Link>
        </>
       
    )
}

const styles = {
    linkWrapper:{
        textDecoration:"none",
        color:"black",
        "&:hover":{
            Opacity:0.5
        },
    },
    mainContainer:{
        maxWidth:"250px",
        textAlign:"center"
    },
    container:{
        position:"relative"
    },
    pillHolder:{
        position: "absolute",
        left:"50%",
        bottom: "0",
        transform:"translate(-50%)"
    },
    
}

export default DisplayArtistComponent;