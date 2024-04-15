
import ArticleProvider from '../../Providers/ArticleProvider';
import { Categories, FetchMode } from "../../Types/ArticleFetchMode"; // types and enums
import ArticleCategoryDisplay from './ArticleCategoryDisplay';






const FeaturedArtistPage = () => {

    return (
    
    <>
    <ArticleProvider mode={FetchMode.ALL} category={Categories.FEATURED_ARTIST}>
        <ArticleCategoryDisplay title="featured artists"/>

    </ArticleProvider>

    </>
    );
};

export default FeaturedArtistPage;
