import SectionComponent from "../../../helpers/SectionComponent";
import InformationComponent from "../../../helpers/InformationComponent";
import { Grid,Box,CircularProgress } from "@mui/material";
import DisplayArtistComponent from "./DisplayArtistComponent";
import{ useMentees} from "../../../customhooks/useMentees";
// import { useArtists } from "../../../customhooks/useArtists";
import Typography from "@mui/material/Typography";
import RisingStarsSection from "../../sections/RisingStarSection";

const MenteeListComponentV2 = () => {
    const { mentees, loading, error } = useMentees();
    
      if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }
    if (error)  return null;
    
    return mentees ?(

        <RisingStarsSection mentees={ mentees}/>
    ) : null;
}

const styles = {
    ArtistContainer: {
        marginTop: "3rem"
    }
}

export default MenteeListComponentV2;