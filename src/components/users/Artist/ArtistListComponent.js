import React from "react";
import SectionComponent from "../../../Helpers/SectionComponent";
import InformationComponent from "../../../Helpers/InformationComponent";
import { Grid } from "@mui/material";
import Artist from "../../../models/users/Artist";
import DisplayArtistComponent from "./DisplayArtistComponent";
const ArtistListComponent = () => {
    const ShowArtists = () =>{
        let allArtists = new Artist()
        let artists = allArtists.getAll();
        return(
            <Grid container sx={styles.ArtistContainer}>
            {artists.map(artist => {
                return <Grid Item><DisplayArtistComponent artist={artist} /></Grid>
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
        justifyContent:"space-between",
        marginTop: "3rem"
    }
    
}

export default ArtistListComponent