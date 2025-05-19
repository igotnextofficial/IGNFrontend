import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../customhooks/useFetch";
import { UserDataType } from "../types/DataTypes";
import { APP_ENDPOINTS } from "../config/app";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, Card, CardMedia, CardContent, Grid, Typography, Container, Paper } from "@mui/material";
import dayjs from 'dayjs';

const UserProfile = () => {
  const { fetchData } = useFetch();
  const { user_id } = useParams()
  const [user, setUser] = useState<UserDataType | null>(null);
  const [socialLinks, setSocialLinks] = useState<Record<string, any>>({});
  const [userSubtitle, setUserSubtitle] = useState<string>("");

  useEffect(() => {
    fetchData(`${APP_ENDPOINTS.USER.SINGLE}/${user_id}`).then((data: UserDataType) => {
      setUser(data['data']);
    });
  }, []);

  useEffect(() => {
    const social_links = {
      'twitter': { icon: <TwitterIcon fontSize="large" htmlColor="#FBFAF9" />, link: '#' },
      'facebook': { icon: <FacebookIcon fontSize="large" htmlColor="#FBFAF9" />, link: '#' },
      'instagram': { icon: <InstagramIcon fontSize="large" htmlColor="#FBFAF9" />, link: '#' },
    }
    setSocialLinks(social_links)

    let subtitle = '';
    if (user?.role.type === 'artist') {
      subtitle = `Genre: ${user?.genre} ${user?.role.type}`
    }
    else if (user?.role.type === 'mentor') {
      subtitle = 'Specialties: ' + user?.specialties.join(', ')
    }
    else {
      subtitle = user?.role.type as string
    }

    setUserSubtitle(subtitle);
  }, [user]);

  return user && (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FBFAF9 0%, #f2c85b 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          background: '#FBFAF9'
        }}>
          <Grid container>
            {/* Profile Image Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'relative', height: '100%' }}>
                <CardMedia
                  component="img"
                  image={user.profile_photo_path}
                  alt={user.fullname}
                  sx={{ 
                    height: '100%',
                    minHeight: 400,
                    objectFit: 'cover'
                  }}
                />
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                  p: 2,
                  pb: 4
                }}>
                  <Grid container spacing={2} justifyContent="flex-end">
                    {Object.keys(socialLinks).map((key: string) => (
                      <Grid item key={key}>
                        <Link to={socialLinks[key].link} style={{ textDecoration: 'none' }}>
                          {socialLinks[key].icon}
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>

            {/* Profile Info Section */}
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 4 }}>
                <Typography 
                  variant="h2" 
                  sx={{
                    color: '#1d1917',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 2,
                    textTransform: 'capitalize'
                  }}
                >
                  {user.fullname}
                </Typography>

                <Typography 
                  variant="h6" 
                  sx={{
                    color: '#ff6347',
                    mb: 3,
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}
                >
                  {userSubtitle}
                </Typography>

                <Typography 
                  variant="body1" 
                  sx={{
                    color: '#1d1917',
                    fontSize: '1.2rem',
                    lineHeight: 1.8,
                    mb: 4
                  }}
                >
                  {user.bio}
                </Typography>

                <Box sx={{ 
                  mt: 4,
                  p: 2,
                  background: '#f2c85b',
                  borderRadius: 2,
                  display: 'inline-block'
                }}>
                  <Typography variant="body2" sx={{ color: '#1d1917', fontWeight: 500 }}>
                    Member since {dayjs(user.created_at).format('MMMM D, YYYY')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default UserProfile;