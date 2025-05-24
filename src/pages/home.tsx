import React, { useEffect } from 'react';
// import ArtistListComponent from "../components/users/artist/ArtistListComponent";
import FeaturedMentors from "../components/sections/FeaturedMentors";
import FeatureArticleComponent from "../components/article/FeatureArticleComponent";
import MenteeListComponent from "../components/users/mentee/MenteeListComponent";
import AboutUsComponent from "../components/generic/AboutUsComponent";
import ArticleProvider from '../providers/ArticleProvider';
import { FetchMode } from '../types/ArticleFetchMode';
import { useErrorHandler } from '../contexts/ErrorContext';
import MentorshipHeroSection from '../components/generic/MentorshipHeroSection';
import LocalStorage from '../storage/LocalStorage';
import Loader from '../components/Loader';
import AboutIntroSection from '../components/generic/AboutIntroSection';
 
 import { useUser } from '../contexts/UserContext';

const Home = () => {
    const {updateError} = useErrorHandler();
    const {user} = useUser();

    useEffect(() => {

        // const getUsers = async () => {

        //     const response = await fetch('https://shield.igotnext.local/api/users');
        //     const data = await response.json();
        //     console.log(data);
        // }
        // getUsers().catch(console.error);
    },[])
    return(
        <>
            {!user && <MentorshipHeroSection/>}
            <FeaturedMentors/>
            <ArticleProvider mode={FetchMode.FEATURED}>  <FeatureArticleComponent/> </ArticleProvider>
           
            <MenteeListComponent/>
            <AboutIntroSection/>

        </>
    );
}



export default Home;