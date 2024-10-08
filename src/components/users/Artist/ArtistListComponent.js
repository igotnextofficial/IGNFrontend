import SectionComponent from "../../../Helpers/SectionComponent";
import InformationComponent from "../../../Helpers/InformationComponent";
import { Grid } from "@mui/material";
import Artist from "../../../Models/Users/Artist";
import DisplayArtistComponent from "./DisplayArtistComponent";
const ArtistListComponent = () => {
    const ShowArtists = () =>{
        let allArtists = new Artist()
        let artists = allArtists.getAll();
        return(
            <Grid container sx={styles.ArtistContainer}>
            {artists.map(artist => {
                return <Grid key={`${artist.name}${Math.random() * 2 ** 9}`} xs={6} md={3} sx={{padding:"1rem"}} Item><DisplayArtistComponent artist={artist} /></Grid>
            })}

            </Grid>
        )
    }
   
    return( 
        <SectionComponent  alternate={true} >
            <InformationComponent title="Music Artist you should know!" />
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