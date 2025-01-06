import { useState,useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import useFetch  from "../customhooks/useFetch";
import { UserDataType } from "../types/DataTypes";
import { APP_ENDPOINTS } from "../config/app";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, Card, CardMedia, CardContent, Grid, Typography } from "@mui/material";
import { Subtitles } from "@mui/icons-material";
 

 

const UserProfile = () => {
 const {fetchData} = useFetch();
 const {user_id} = useParams()
 const [user, setUser] = useState<UserDataType | null>(null);
 const [socialLinks, setSocialLinks] = useState<Record<string,any>>({});
 const [userSubtitle, setUserSubtitle] = useState<string>("");
 
 useEffect(() => {
        
        fetchData(`${APP_ENDPOINTS.USER.SINGLE}/${user_id}`).then((data:UserDataType) => {
            setUser(data['data']);
        });

 

 }, []);

 useEffect(() => {
    const social_links = {
        'twitter':{icon:<TwitterIcon fontSize="large" htmlColor="white"/>,link:'#'},
        'facebook':{icon:<FacebookIcon fontSize="large" htmlColor="white"/>,link:'#'},
        'instagram':{icon:<InstagramIcon fontSize="large" htmlColor="white"/>,link:'#'},
    }
    setSocialLinks(social_links)

    let subtitle = '';
    if(user?.role.type === 'artist'){
        subtitle = ` genre: ${user?.genre} ${user?.role.type}`
    }
    else if(user?.role.type === 'mentor'){
        subtitle = 'specialties: ' + user?.specialties.join(', ')
    }
    else{
        subtitle = user?.role.type as string
    }

    setUserSubtitle(subtitle);
 }, [user]);
  return user && (
    <Box>
        <Grid container justifyContent={'center'} alignItems={'center'} sx={{backgroundColor:"#fc0"}}>
            <Grid item xs={8}  >

    
                <Typography 
                    sx={{textAlign:'center',fontSize:'3em', lineHeight:'1.2em',textTransform:'capitalize',fontWeight:'bold'}}>
                        {user.fullname}
                        </Typography>
                <Typography variant="subtitle1" sx={{fontWeight:'bold',textAlign:'center',textTransform:'capitalize'}}>
                    {
                        userSubtitle 
                    }
                    
                </Typography>
                
                <Typography variant="subtitle1" sx={{textAlign:'center',textTransform:'capitalize', fontSize:'1.3em',paddingTop:'1.2em'}}>
                    {user.bio}
                </Typography>
               
             
            </Grid>
            <Grid item xs={4}>
            <Card sx={{ position: "relative", overflow: "hidden" , borderRadius:0,cursor:'pointer'}}>
                    <CardMedia
                        component="img"
                        image={user.profile_photo_path}
                        alt={user.fullname}
                        sx={{ height: 600 }}
                    />
                    <CardContent
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadis:'0',
                        background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 0) 100%)",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                       

                        <Grid container gap={2} justifyContent={"flex-end"}>
                            {Object.keys(socialLinks).map((key:string) => {
                                return (
                                   <Link to ={socialLinks[key].link}> <Grid item key={key}>{socialLinks[key].icon}</Grid></Link>
                                )
                            })}
                        </Grid>
             
                    </CardContent>
                </Card>
             
            </Grid>
        </Grid>
    </Box>
  );
}

export default UserProfile;