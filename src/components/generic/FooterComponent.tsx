import React from 'react';
import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Ignlogo from "../Ignlogo";

const FooterComponent: React.FC = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    return (
        <Box 
            id="footer-container" 
            component="footer"
            sx={{
                ...styles.container,
                position: 'relative',
                zIndex: 1,
                marginTop: 'auto'
            }}
        >
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={4}>
                    <Ignlogo />
                </Grid>
                <Grid item xs={8}>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <TwitterIcon fontSize="large" htmlColor="white" />
                        </Grid>
                        <Grid item>
                            <InstagramIcon fontSize="large" htmlColor="white" />
                        </Grid>
                        <Grid item>
                            <FacebookIcon fontSize="large" htmlColor="white" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider style={styles.spacer} />
            <Grid container justifyContent="space-between">
                <Grid item xs={4}>
                    <Grid container sx={{ marginTop: "2rem" }}>
                        <Grid item xs={12}>
                            <Link  href="/" sx={styles.links}>
                                Home
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/about" sx={styles.links}>
                                About us
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/articles/whos-next" sx={styles.links}>
                                Who's Next
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/articles/feature-artist" sx={styles.links}>
                                Feature Artist
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/articles/entertainment-news" sx={styles.links}>
                                Entertainment News
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container sx={{ marginTop: "2rem" }}>
                        <Grid item xs={12}>
                            <Link  href="/privacy-policy" sx={styles.links}>
                                Privacy Policy
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/community-guidelines" sx={styles.links}>
                                Community Guidelines
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/resources" sx={styles.links}>
                                Resources
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/terms-of-service" sx={styles.links}>
                                Terms of Service
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/become-a-mentor" sx={styles.links}>
                                Become a Mentor
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container sx={{ marginTop: "2rem" }}>
                        <Grid item xs={12}>
                            <Link  href="/news-press" sx={styles.links}>
                                News & Press Releases
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/advertise" sx={styles.links}>
                                Advertise With Us
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/faqs" sx={styles.links}>
                                FAQs
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/directory/mentor" sx={styles.links}>
                                Mentor Directory
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link  href="/directory/mentee" sx={styles.links}>
                                Mentee Directory
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Divider style={styles.spacer} />
            <Typography sx={{ opacity: "0.5" }}>
                Copyright © {currentYear}
            </Typography>
        </Box>
    );
};

const styles = {
    container: {
        backgroundColor: "#fd2f30",
        backgroundImage: "linear-gradient(to bottom,#fd2f30,#cf1d1d)",
        padding: { xs: "2rem 1rem", sm: "2rem 4rem", md: "2rem 10rem" },
        width: '100%',
        flexShrink: 0
    },
    links: {
        color: "#820000",
        lineHeight: "2rem",
        textDecoration: "none",
        fontSize: "1rem"
    },
    spacer: {
        margin: "1.5rem 0"
    }
};

export default FooterComponent; 