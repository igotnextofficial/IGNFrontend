import { useContext } from 'react'
import { Box, Button, Grid, Typography} from '@mui/material'
import ArticleProvider from '../../Providers/ArticleProvider'
import ListArticlesComponent from '../../Components/Article/ListAritclesComponent '
import { FetchMode } from '../../Types/ArticleFetchMode'
import { ArticleContext } from '../../Contexts/ArticleContext'
import { useUser } from '../../Contexts/UserContext'
import DashboardSectionBorder from '../../Components/Users/Mentor/DashboardSectionComponentWithBorder'
import ContentContainer from '../../Utils/ContentContainer'

import TextContentComponent from '../../Helpers/TextContentComponent'
import { ArtistDataType } from '../../Types/DataTypes'
import MentorsFeedback from '../../Components/Users/Artist/MentorsFeedback'
import IconOnlyTopSection from '../../Components/Users/IconOnlyTopSection'
import DisplayTextComponent from '../../Components/Users/DisplayTextComponent'

import { Link } from 'react-router-dom'
import CurrentMentorDisplay from '../../Components/Users/Artist/CurrentMentorDisplay'
import ListMentors from '../../Components/Users/Mentor/ListMentors'




const RecentArticles = ({currentUser}: {currentUser:ArtistDataType}) => {
    const { allArticles } = useContext(ArticleContext);

    return (
        allArticles && allArticles.length > 0  ?  <>
            {allArticles && <ListArticlesComponent articles={allArticles} />}

        </>: < DefaultMessaging />
    )
}


const DefaultMessaging = () => {
    return <Typography sx={{ display: 'block', color: '#c7c7c7',padding:'15px' }} component="span" variant="body2"> No Data Available </Typography>
}




const DisplayBio = ({user} : {user:ArtistDataType}) => {
    return user.bio ? <>
  
            <DisplayTextComponent text={user?.bio || ""} />

</>: null
}
const ArtistDashboard = () => {
    const { user  } = useUser() 
    if (!user) {
        return <Typography>User not found or not logged in</Typography>;
    }
    return  (
        <ContentContainer>

        
            <ArticleProvider mode={FetchMode.USER} id={user?.id}>

         

                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={8} >
                    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={12}>
                            <DashboardSectionBorder title="Profile Information" >
                                <IconOnlyTopSection />
                            </DashboardSectionBorder>
                            </Grid>

                            {
                            user.mentor === null && <Grid item xs={12}>
                                <DashboardSectionBorder title="Choose A mentor" >
                                    <ListMentors/>
                                </DashboardSectionBorder>
                            </Grid>
                            }
                
                            <Grid item xs={12}>
                                <DashboardSectionBorder title="Most Recent Articles" >
                                    <RecentArticles currentUser={user as ArtistDataType} />
                                </DashboardSectionBorder>
                            </Grid>

                            <Grid item xs={12}>
                                <DashboardSectionBorder title={`${user?.fullname} Bio`} >
                             
                                {user.bio  && <Grid item xs={12}> <DisplayTextComponent text={user.bio || ""} /> </Grid>}
                                </DashboardSectionBorder>
                            </Grid>

                    </Grid>
                    

                        {/* <ProfileTopSection/> */}
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={12}>
                                <DashboardSectionBorder title="Mentor's Feedback:" >
                                    <MentorsFeedback/>
                                </DashboardSectionBorder>
                            </Grid>
                            <Grid item xs={12}>
                                <DashboardSectionBorder title={`Current Mentor: ${user?.mentor.fullname}`} >
                                  <CurrentMentorDisplay user={user as ArtistDataType}/>
                                
                                </DashboardSectionBorder>
                            </Grid>
                        </Grid>
                    </Grid>

               
                    <Grid item xs={4}>
                  
                    </Grid>

              

                </Grid>
            </ArticleProvider>
        </ContentContainer>
    )
}

export default ArtistDashboard