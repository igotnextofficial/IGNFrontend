import SectionComponent from "../../../helpers/SectionComponent";
import InformationComponent from "../../../helpers/InformationComponent";
import { Grid } from "@mui/material";
import DisplayArtistComponent from "./DisplayArtistComponent";
import{ useMentees} from "../../../customhooks/useMentees";
// import { useArtists } from "../../../customhooks/useArtists";
import Typography from "@mui/material/Typography";

const MenteeListComponent = () => {
    const { mentees, loading, error } = useMentees();
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <SectionComponent alternate={true}>
                 <Typography
                      variant="h3"
                      component="h2"
                      sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        color: 'black'
                      }}
                    >
                     Rising Stars You Should Know!
                    </Typography>
       
                <Grid container sx={styles.ArtistContainer}>
                    {mentees?.map(mentee => (
                        <Grid key={mentee.id} xs={6} md={3} sx={{padding:"1rem"}} item>
                            <DisplayArtistComponent mentee={mentee} />
                        </Grid>
                    ))}
                </Grid>
        
        </SectionComponent>
    );
}

const styles = {
    ArtistContainer: {
        marginTop: "3rem"
    }
}

export default MenteeListComponent;