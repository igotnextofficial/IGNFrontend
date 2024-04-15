import { Box, Grid} from "@mui/material";
import { AboutIGN } from "../../StaticInformation/aboutus";
import InformationComponent from "../../Helpers/InformationComponent";
import SectionComponent from "../../Helpers/SectionComponent";
import TextContentComponent from "../../Helpers/TextContentComponent";

const AboutUsComponent = () => {
    return( 
      <SectionComponent>
        <Grid container spacing={2}>
            <Grid item md={5} sx={styles.contentInfoHolder}>

           <InformationComponent 
            title={AboutIGN.title}
            buttonLabel="Read More"
            buttonLink="/about-us"
           >
            <TextContentComponent content={AboutIGN.content} />
            </InformationComponent>
            </Grid>
            <Grid item  md={7}>
                <Box sx={{}}>
                    <img style={{width:"100%",boderRadius:"10%"}} src="https://png.pngtree.com/background/20230611/original/pngtree-artistic-abstract-music-concept-for-headphones-picture-image_3162681.jpg" alt="-about" />
                </Box>
            </Grid>
        </Grid>
       
        </SectionComponent>
        )
}   

const styles={

    contentInfoHolder:{
        margin: "auto"
    },


}
export default AboutUsComponent