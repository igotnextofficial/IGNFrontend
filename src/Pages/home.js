import ArtistListComponent from "../Components/Users/Artist/ArtistListComponent";
import MentorListComponent from "../Components/Users/Mentor/MentorListComponent";
import FeatureArticleComponent from "../Components/Article/FeatureArticleComponent";
import AboutUsComponent from "../Components/Generic/AboutUsComponent";

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