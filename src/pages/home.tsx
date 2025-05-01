import React, { useEffect } from 'react';
// import ArtistListComponent from "../components/users/artist/ArtistListComponent";
import FeaturedMentors from "../components/sections/FeaturedMentors";
import FeatureArticleComponent from "../components/article/FeatureArticleComponent";
import AboutUsComponent from "../components/generic/AboutUsComponent";
import ArticleProvider from '../providers/ArticleProvider';
import { FetchMode } from '../types/ArticleFetchMode';
import { useErrorHandler } from '../contexts/ErrorContext';
import LocalStorage from '../storage/LocalStorage';
import Loader from '../components/Loader';

const Home = () => {
    const {updateError} = useErrorHandler();

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

            <ArticleProvider mode={FetchMode.FEATURED}>  <FeatureArticleComponent/> </ArticleProvider>
           
            <AboutUsComponent/>
            {/* <ArtistListComponent/> */}
            <FeaturedMentors/>

        </>
    );
}



export default Home;