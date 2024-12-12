import SectionComponent from "../../../helpers/SectionComponent";
import InformationComponent from "../../../helpers/InformationComponent";
import { Grid } from "@mui/material";
import Artist from "../../../models/users/Artist";
import DisplayArtistComponent from "./DisplayArtistComponent";
import {v4 as uuidv4} from "uuid";
import { useUser } from "../../../contexts/UserContext";

const ArtistListComponent = () => {
    const ShowArtists = () =>{
        const {artists} = useUser();
        let allArtists = new Artist()
    
        return(
            <Grid container sx={styles.ArtistContainer}>
            {artists?.map(artist => {
                console.log(`Artist ${JSON.stringify(artist)}`)
                return <Grid key={`${uuidv4()}`} xs={6} md={3} sx={{padding:"1rem"}} item><DisplayArtistComponent artist={artist} /></Grid>
            })}

            </Grid>
        )
    }
   
    return( 
        <SectionComponent  alternate={true} >
            <InformationComponent title="Music Artist you should know!" ><></></InformationComponent>
                <ShowArtists/>
            
        </SectionComponent>
       
    )
}

const styles = {
    ArtistContainer:{
      
        marginTop: "3rem"
    }
    
}

export default ArtistListComponent