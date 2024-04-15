import { Link } from "react-router-dom";
import { Grid } from "@mui/material";


const MainPageList = ()=>{
    const linksData = [
        {
          slug: '/',
          name: "Home",
          order: 1,
          display: true,
        },
        {
          slug: "whos-next",
          name: "Who's Next",
          order: 2,
          display: true,
        },
        {
          slug: "featured-artists",
          name: "Featured Artists",
          order: 3,
          display: true,
        },
        {
          slug: "entertainment-news",
          name: "Entertainment News",
          order: 4,
          display: true,
        },
        {
          slug: "artist-of-the-month",
          name: "Artist of the Month",
          order: 5,
          display: true,
        },
      ];
      

    const RenderLinks = () => {

        const sortedLinks = linksData.sort((a,b) => a.order - b.order);

        const visibleLinks = sortedLinks.filter(link => link.display);

        const linkElements = visibleLinks.map((linkItem,index) => {
            return <Grid key={index} className="ign-links" item><Link to={linkItem.slug}>{linkItem.name}</Link></Grid>
        })


        return(
            <>
               {
                linkElements 
               }
            </>
        )
    }
      
    
    return (
        <>
            <RenderLinks/>
        </>
    )
}

export default MainPageList

