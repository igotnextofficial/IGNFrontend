
import { Grid } from "@mui/material"
import { Link } from "react-router-dom";
import Ignlogo from '../Ignlogo';
 




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





const BrowserNavigation = ()=> {



     
    return (
    <>
    <Grid container  alignItems={"center"} spacing={3} sx={{"flexWrap":"nowrap"}}>
        <Grid item sx={{backgroundColor:'#cf1d1d',paddingRight:"24px"}}>
            <Ignlogo/>
        </Grid>
        <MainPageList/>


    </Grid>
    </>
    )
}

export default BrowserNavigation