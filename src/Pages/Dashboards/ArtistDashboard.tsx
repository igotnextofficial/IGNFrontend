import React, { useContext } from 'react'
import { Grid, Typography, Avatar} from '@mui/material'
import ArticleProvider from '../../Providers/ArticleProvider'
import ListArticlesComponent from '../../Components/Article/ListAritclesComponent '
import { FetchMode } from '../../Types/ArticleFetchMode'
import { ArticleContext } from '../../Contexts/ArticleContext'
import { useUser } from '../../Contexts/UserContext'
import DashboardSectionComponent from '../../Components/DashboardSectionComponent'
import ContentContainer from '../../Utils/ContentContainer'
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TextContentComponent from '../../Helpers/TextContentComponent'
import { ArtistDataType } from '../../Types/DataTypes'
import Artist from '../../Models/Users/Artist'
import { Link } from 'react-router-dom'



const RecentArticles = ({currentUser}: {currentUser:ArtistDataType}) => {
    const { allArticles } = useContext(ArticleContext);

    return (
        allArticles && allArticles.length > 0  ?  <>
            {allArticles && <ListArticlesComponent articles={allArticles} />}

        </>: < DefaultMessaging />
    )
}


const MentorsFeedBack = () => {
    return <DefaultMessaging />
}
const DefaultMessaging = () => {
    return <Typography sx={{ display: 'block', color: '#c7c7c7',padding:'15px' }} component="span" variant="body2"> No Data Available </Typography>
}

const CurrentUserTopSection = ({currentUser}: {currentUser:ArtistDataType}) => {
    return (
        <Link to={"/edit-profile"}>
        <List sx={{ width: '100%', maxWidth: 640, bgcolor: 'background.paper' }}>
        
            <ListItem >
                <ListItemAvatar sx={{ marginRight: 2 }}>
                    <Avatar alt={currentUser.fullname} src={currentUser.image} sx={{ width: 56, height: 56 }} />
                </ListItemAvatar>
                <ListItemText

                    primary={
                        <React.Fragment>
                            <Typography
                                sx={{ color: '#1d1917', fontSize: '2em', fontWeight: "bold" }}
                                component="h2"
                                variant="body2"
                            >
                                {currentUser.username ?? currentUser.fullname}'s Profile
                            </Typography>
                        </React.Fragment>
                    }
                    secondary=
                    {<React.Fragment>


                        <Typography
                            sx={{ display: 'block', color: '#c7c7c7' }}
                            component="span"
                            variant="body2"

                        >
                            Genre: {currentUser.genre || 'N/A'}
                        </Typography>
                    </React.Fragment>
                    }
                />
                   <ModeEditIcon sx={{alignSelf:"flex-start",opacity:"0.5"}}/>
            </ListItem>
        </List>
        </Link>
    )
}


const DisplayBio = ({user} : {user:ArtistDataType}) => {
    return user.bio ? <>
          <Grid sx={{ backgroundColor: "lightgrey", padding: 2, borderRadius: "5px", marginTop: 2, MarginBottom: 2 }}>
         <TextContentComponent content={user?.bio || ""} />
    </Grid> 
</>: null
}
const ArtistDashboard = () => {
    const { user } = useUser()
    if (!user) {
        return <Typography>User not found or not logged in</Typography>;
    }
    return  (
        <ContentContainer>

        
            <ArticleProvider mode={FetchMode.USER} id={user?.id}>

         

                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12}>
                    <CurrentUserTopSection currentUser={user as ArtistDataType} />
           
                    </Grid>

                    {user.bio && <Grid item xs={12}> <DisplayBio user={user as ArtistDataType}/> </Grid>}
                    <Grid item xs={4}>
                        <DashboardSectionComponent title="Mentor's Feedback:" >
                            <MentorsFeedBack/>
                        </DashboardSectionComponent>
                    </Grid>

                    <Grid item xs={4}>
                        <DashboardSectionComponent title="Most Recent Articles" >
                            <RecentArticles currentUser={user as ArtistDataType} />
                        </DashboardSectionComponent>
                    </Grid>


                </Grid>
            </ArticleProvider>
        </ContentContainer>
    )
}

export default ArtistDashboard