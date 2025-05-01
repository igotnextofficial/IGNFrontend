import SectionComponent from "../../../helpers/SectionComponent";
import InformationComponent from "../../../helpers/InformationComponent";
import { Grid } from "@mui/material";
import DisplayArtistComponent from "./DisplayArtistComponent";
// import { useArtists } from "../../../customhooks/useArtists";

const ArtistListComponent = () => {
    return null;
    // const { artists, loading, error } = useArtists();
    
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    
    // return (
    //     <SectionComponent alternate={true}>
    //         <InformationComponent title="Music Artists you should know!">
    //             <Grid container sx={styles.ArtistContainer}>
    //                 {artists?.map(artist => (
    //                     <Grid key={artist.id} xs={6} md={3} sx={{padding:"1rem"}} item>
    //                         <DisplayArtistComponent artist={artist} />
    //                     </Grid>
    //                 ))}
    //             </Grid>
    //         </InformationComponent>
    //     </SectionComponent>
    // );
}

const styles = {
    ArtistContainer: {
        marginTop: "3rem"
    }
}

export default ArtistListComponent;