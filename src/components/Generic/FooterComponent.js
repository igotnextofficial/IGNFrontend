
import { Box, Divider,Grid, Link, Typography } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Ignlogo from "../Ignlogo";

const FooterComponent = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return(
        <Box sx={styles.container}>
            <Grid container justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={4}><Ignlogo/></Grid>
                <Grid item xs={8}>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item><TwitterIcon fontSize="large" htmlColor="white"/></Grid>
                        <Grid item><InstagramIcon fontSize="large" htmlColor="white"/></Grid>
                        <Grid item> <FacebookIcon fontSize="large" htmlColor="white"/></Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider style={styles.spacer} />
            <Grid container justifyContent={"space-between"}>
                <Grid item xs={4}>
                    <Grid container sx={{marginTop:"2rem"}}>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Home</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">About us</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Who's Next</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Feature Artist</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Entertainment News</Link></Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container sx={{marginTop:"2rem"}}>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Privacy Policy</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Community Guidelines</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Resources</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Terms & Agreements</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Become a Mentor</Link></Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container sx={{marginTop:"2rem"}}>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">News &amp; Press Releases</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Advertise With Us</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">FAQs</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Mentor Directory</Link></Grid>
                        <Grid item xs={12} ><Link sx={styles.links} to="/">Artist Directory</Link></Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Divider  style={styles.spacer}  />
            <Typography sx={{opacity:"0.5"}}>Copyright@{currentYear}</Typography>
            
        </Box>
    )
}


const styles={
    container: {
        backgroundColor:"#fd2f30",
        backgroundImage:"linear-gradient(to bottom,#fd2f30,#cf1d1d)",
        padding: "2rem 10rem"
    },
    links:{
        color:"#820000",
        lineHeight:"2rem",
        textDecoration:"none",
        fontSize: "1rem"
    },
    spacer:{
        margin: "1.5rem 0"
    }
}
export default FooterComponent;