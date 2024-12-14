import { Box, Grid, Typography} from "@mui/material";
import { AboutIGN } from "../../staticinformation/aboutus";
import InformationComponent from "../../helpers/InformationComponent";
import SectionComponent from "../../helpers/SectionComponent";

 
 


const AboutUsComponent = () => {
    return( 
      <Box sx={styles.backgroundContainer}>
        <Grid container spacing={2}>
            <Grid item md={5} sx={styles.contentInfoHolder}>

          <Typography variant="h3" sx={styles.title}>{AboutIGN.title}</Typography>
            <Typography sx={styles.content}>{AboutIGN.content}</Typography>
       
            </Grid>
            <Grid item  md={7}>
                <Box sx={{}}>
                    {/* <img style={{width:"100%",boderRadius:"10%"}} src="https://png.pngtree.com/background/20230611/original/pngtree-artistic-abstract-music-concept-for-headphones-picture-image_3162681.jpg" alt="-about" /> */}
                </Box>
            </Grid>
        </Grid>
       
        </Box>
        )
}   

const styles={
    backgroundContainer:{
        backgroundImage: "url('/images/ign_background_about_v1.jpg')",
        backgroundColor: "#000000",
        backgroundSize: "cover",
        padding: "2rem",
        display:'flex',
        minHeight: "50dvh",
      
        
    },
    contentInfoHolder:{
    
        margin: "auto"
    },

    title: {
        fontSize: {
          xs: "1.8em", // Smaller font size for extra small screens
          sm: "2.2em", // Slightly larger for small screens
          md: "3em", // Default for medium and larger screens
        },
        lineHeight: "1.2em",
        margin: "8px 0",
        color: "#300500",
        fontWeight: "bold",
        maxWidth: "700px",
      },
      content: {
        fontSize: {
          xs: "1em", // Smaller font size for mobile
          sm: "1.1em", // Slightly larger font size for small screens
          md: "1.3em", // Default font size for medium and larger screens
        },
        lineHeight: "2em", // Adjusted for mobile readability
        color: "#020000",
      },


}
export default AboutUsComponent