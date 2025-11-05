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
          slug:'',
          name: "Stories",
          order: 6,
        },
        {
          slug: "rising-stars",
          name: "Rising Stars",
          order: 2,
          display: true,
        },
        {
          slug: "spotlight-and-industry-moves",
          name: "Spotlight & Industry Moves",
          order: 3,
          display: true,
        },
        {
          slug: "culture-and-commentary",
          name: "Culture & Commentary",
          order: 4,
          display: true,
        },
        {
          slug: "tutorials-and-mentorship",
          name: "Tutorials & Mentorship",
          order: 5,
          display: true,
        },
        {
          slug: "beyond-the-stage",
          name: "Beyond the Stage",
          order: 6,
          display: true,
        },
        {
          slug: "ign-games",
          name: "IGN Games",
          order: 7,
          display: true,
        },
      ];
      

    const RenderLinks = () => {

        const sortedLinks = linksData.sort((a,b) => a.order - b.order);

        const visibleLinks = sortedLinks.filter(link => link.display);

        const linkElements = visibleLinks.map((linkItem,index) => {
            return <Grid key={index} sx={{flexWrap:"nowrap"}} className="ign-links" item><Link to={linkItem.slug}>{linkItem.name}</Link></Grid>
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
