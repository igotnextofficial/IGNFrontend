import { Box,Avatar } from "@mui/material";
import IgnPillComponent from "../../../helpers/IgnPillComponent";
import TextContentComponent from "../../../helpers/TextContentComponent";
import { ArtistDataType } from "../../../types/DataTypes";
import { useEffect } from "react";
const DisplayArtistComponent = ({artist }: {artist:ArtistDataType}) => {
    useEffect(() => {

        console.log(`Artist ${JSON.stringify(artist)}`)
    }, [artist])
    return (
        <>
        <Box sx={styles.mainContainer} >
                <Box sx={styles.container}>
                    <Avatar className="display-image-list-ign" src={artist.profile_photo_path} alt={artist.fullname} sx={{width:250, height:250}} />
                    <Box sx={styles.pillHolder}>
                        <IgnPillComponent description={artist.genre} />
                    </Box>
                </Box>
                <Box>
                    <TextContentComponent content={artist.fullname} />
                </Box>
        
            </Box>
        </>
    )
}

const styles = {
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