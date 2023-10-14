import React from "react"
import MainNavigation from "../components/navigation/MainNavigation";
import ArtistListComponent from "../components/users/Artist/ArtistListComponent";
import MentorListComponent from "../components/users/Mentor/MentorListComponent";
import FeatureArticleComponent from "../components/Article/FeatureArticleComponent";
import AboutUsComponent from "../components/Generic/AboutUsComponent";

const Home = () => {
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