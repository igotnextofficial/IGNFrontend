import { useContext } from 'react'
import { Grid, Typography} from '@mui/material'
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

import ProfileTopSection from '../../Components/Users/ProfileTopSection'



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
                        <ProfileTopSection/>
                    </Grid>

                    {user.bio && <Grid item xs={12}> <DisplayBio user={user as ArtistDataType}/> </Grid>}
                    <Grid item xs={4}>
                        <DashboardSectionBorder title="Mentor's Feedback:" >
                            <MentorsFeedback/>
                        </DashboardSectionBorder>
                    </Grid>

                    <Grid item xs={4}>
                        <DashboardSectionBorder title="Most Recent Articles" >
                            <RecentArticles currentUser={user as ArtistDataType} />
                        </DashboardSectionBorder>
                    </Grid>


                </Grid>
            </ArticleProvider>
        </ContentContainer>
    )
}

export default ArtistDashboard