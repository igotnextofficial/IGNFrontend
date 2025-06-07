import SectionComponent from "../../../helpers/SectionComponent";
import InformationComponent from "../../../helpers/InformationComponent";
import { Grid, Box, Skeleton } from "@mui/material";
import DisplayArtistComponent from "./DisplayArtistComponent";
import { useMentees } from "../../../customhooks/useMentees";
// import { useArtists } from "../../../customhooks/useArtists";
import Typography from "@mui/material/Typography";
import RisingStarsSection from "../../sections/RisingStarSection";

const MenteeListComponentV2 = () => {
    const { mentees, loading, error } = useMentees();
    
    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <Skeleton variant="text" width="35%" height={50} sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[...Array(6)].map((_, index) => (
                        <Skeleton key={index} variant="circular" width={120} height={120} />
                    ))}
                </Box>
            </Box>
        );
    }

    if (error) return null;
    
    return mentees ? (
        <RisingStarsSection mentees={mentees}/>
    ) : null;
}

const styles = {
    ArtistContainer: {
        marginTop: "3rem"
    }
}

export default MenteeListComponentV2;