import React, { useEffect } from 'react';
import ArtistListComponent from "../components/users/artist/ArtistListComponent";
import MentorListComponent from "../components/users/mentor/MentorListComponent";
import FeatureArticleComponent from "../components/article/FeatureArticleComponent";
import AboutUsComponent from "../components/generic/AboutUsComponent";
import ArticleProvider from '../providers/ArticleProvider';
import { FetchMode } from '../types/ArticleFetchMode';
import { useErrorHandler } from '../contexts/ErrorContext';

const Home = () => {
    const {updateError} = useErrorHandler();

    useEffect(() => {
        updateError("Testing error message ");
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
            <ArtistListComponent/>
            <MentorListComponent/>

        </>
    );
}



export default Home;