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
import User from '../models/users/User';
import UserBannerCard from '../components/common/UserBannerCard';
import { Mentor } from '../models/users/Mentor';
import MentorListSlideShow from '../components/common/MentorListSlideshow';
import FeaturedMentorsV2 from '../components/sections/FeaturedMentorsV2';
import MenteeListComponentV2 from '../components/users/mentee/MenteeListComponentV2';

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
           <FeaturedMentorsV2/>
            {/* <FeaturedMentors/> */}
            <ArticleProvider mode={FetchMode.FEATURED}>  <FeatureArticleComponent/> </ArticleProvider>
            <MenteeListComponentV2/>
            {/* <MenteeListComponent/> */}
            <AboutIntroSection/>

        </>
    );
}



export default Home;