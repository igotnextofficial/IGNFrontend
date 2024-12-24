import { useContext, useEffect  } from 'react'
import {Grid, Typography} from '@mui/material'
import ArticleProvider from '../../providers/ArticleProvider'
import ListArticlesComponent from '../../components/article/ListAritclesComponent '
import { FetchMode } from '../../types/ArticleFetchMode'
import { ArticleContext } from '../../contexts/ArticleContext'
import { useUser } from '../../contexts/UserContext'
import DashboardSectionBorder from '../../components/users/mentor/DashboardSectionComponentWithBorder'
import ContentContainer from '../../utils/ContentContainer'


import { ArtistDataType } from '../../types/DataTypes'
import MentorsFeedback from '../../components/users/artist/MentorsFeedback'
import IconOnlyTopSection from '../../components/users/IconOnlyTopSection'
import DisplayTextComponent from '../../components/users/DisplayTextComponent'


import CurrentMentorDisplay from '../../components/users/artist/CurrentMentorDisplay'
import ListMentors from '../../components/users/mentor/ListMentors'
import NoDataAvailable from '../../utils/NoDataAvailable'
import NotesFeedback from '../notes/NotesFeedback'

import { APP_ENDPOINTS } from '../../config/app'
import useFetch from '../../customhooks/useFetch'
import LocalStorage from '../../storage/LocalStorage'



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





const ArtistDashboard = () => {
    const { user  } = useUser()
    const {fetchData} = useFetch() 
 
   
    
        useEffect(()=>{
          
            const loadGenres = async ()=>{
                const response = await fetchData(APP_ENDPOINTS.GENERIC.GENRE)
              
                if(response !== null){
                    const  genres = response.data.map((item:any)=> {return item.name})
                    local_storage.save("genres",genres)
                }else{
                    throw new Error("issue loading genres")
                }
            }
            const local_storage = new LocalStorage();
            if(!local_storage.hasItem("genres")){
                  loadGenres().then((response)=>{
           
                     
                  }).catch((e)=>{
                    console.log(`Error loading genres ${e}`)
                  })
            }
            else{
                console.log("genre already loaded")
                console.log(local_storage.load("genres"))
            }  
            
        },[])
  
 
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
                            user?.mentor === null && <Grid item xs={12}>
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
                             
                                {
                                user.bio ? <Grid item xs={12}> <DisplayTextComponent text={user.bio || ""} /> </Grid>
                                
                                : <NoDataAvailable/>
                            }
                                </DashboardSectionBorder>
                            </Grid>

                    </Grid>
                    

                        {/* <ProfileTopSection/> */}
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={12}>
                                <DashboardSectionBorder title="Mentor's Feedback:" >
                                    {user.mentor ? <NotesFeedback/> : <NoDataAvailable/>}
                                </DashboardSectionBorder>
                            </Grid>
                            {user?.mentor !== null && <Grid item xs={12}>
                                <DashboardSectionBorder title={user.mentor.fullname ? `Current Mentor: ${user?.mentor?.fullname}` : ''} >
                                  <CurrentMentorDisplay user={user as ArtistDataType}/>
                                
                                </DashboardSectionBorder>
                            </Grid>}
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