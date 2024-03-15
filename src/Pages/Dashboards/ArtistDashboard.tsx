import React, { useContext } from 'react'
import { Grid, Typography, Avatar} from '@mui/material'
import ArticleProvider from '../../Providers/ArticleProvider'
import ListArticlesComponent from '../../Components/Article/ListAritclesComponent '
import { FetchMode } from '../../Types/ArticleFetchMode'
import { ArticleContext } from '../../Contexts/ArticleContext'
import { UserContext } from '../../Contexts/UserContext'
import DashboardSectionComponent from '../../Components/DashboardSectionComponent'
import ContentContainer from '../../Utils/ContentContainer'


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TextContentComponent from '../../Helpers/TextContentComponent'
import { ArtistDataType } from '../../Types/DataTypes'



const RecentArticles = ({currentUser}: {currentUser:ArtistDataType}) => {
    const { allArticles } = useContext(ArticleContext);

    return (
        <>
            {allArticles && <ListArticlesComponent articles={allArticles} />}

        </>
    )
}


const CurrentUserTopSection = ({currentUser}: {currentUser:ArtistDataType}) => {
    return (
        <List sx={{ width: '100%', maxWidth: 640, bgcolor: 'background.paper' }}>
            <ListItem >
                <ListItemAvatar sx={{ marginRight: 2 }}>
                    <Avatar alt={currentUser.name} src={currentUser.image} sx={{ width: 56, height: 56 }} />
                </ListItemAvatar>
                <ListItemText

                    primary={
                        <React.Fragment>
                            <Typography
                                sx={{ color: '#1d1917', fontSize: '2em', fontWeight: "bold" }}
                                component="h2"
                                variant="body2"
                            >
                                {currentUser.username ?? currentUser.name}'s Profile
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
                            Genre: {currentUser.genre}
                        </Typography>
                    </React.Fragment>
                    }
                />
            </ListItem>

        </List>
    )
}

const ArtistDashboard = () => {
    const { user } = useContext(UserContext)
    if (!user) {
        return <div>User not found or not logged in</div>;
    }
    return  (
        <ContentContainer>

            <CurrentUserTopSection currentUser={user as ArtistDataType} />

            <ArticleProvider mode={FetchMode.USER} id={user?.id}>

                <Grid sx={{ backgroundColor: "lightgrey", padding: 2, borderRadius: "5px", marginTop: 2, MarginBottom: 2 }}>
            <TextContentComponent content={user?.bio || ""} />
                </Grid>

                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4}>
                        <DashboardSectionComponent title="Mentor's Feedback:" >
                            <Typography> No Notes at the moment</Typography>
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