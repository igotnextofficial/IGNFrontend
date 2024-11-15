import SectionComponent from "../../../helpers/SectionComponent";
import InformationComponent from "../../../helpers/InformationComponent";
import { Grid } from "@mui/material";
import Artist from "../../../models/users/Artist";
import DisplayArtistComponent from "./DisplayArtistComponent";
import {v4 as uuidv4} from "uuid";

const ArtistListComponent = () => {
    const ShowArtists = () =>{
        let allArtists = new Artist()
        let artists = allArtists.getAll();
        return(
            <Grid container sx={styles.ArtistContainer}>
            {artists.map(artist => {
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