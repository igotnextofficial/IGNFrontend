import React, { useEffect } from 'react';
import ArtistListComponent from "../Components/Users/Artist/ArtistListComponent";
import MentorListComponent from "../Components/Users/Mentor/MentorListComponent";
import FeatureArticleComponent from "../Components/Article/FeatureArticleComponent";
import AboutUsComponent from "../Components/Generic/AboutUsComponent";

const Home = () => {
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
          
            <FeatureArticleComponent/>
            <AboutUsComponent/>
            <ArtistListComponent/>
            <MentorListComponent/>

        </>
    );
}



export default Home;