import React from 'react';
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import MenuItem from '@mui/material/MenuItem';
import Ignlogo from '../../components/Ignlogo';
import { Link } from 'react-router-dom';

import AccountSettings from '../../components/navigation/AccountSettings';
import BrowserNavigation from '../../components/navigation/BrowserNavigation';
import SigninOrRegister from '../../components/navigation/SigninOrRegister';




const pages = [     {
  slug: '/',
  name: "Home",
  order: 1,
  display: true,
},
{
  slug: "articles/whos-next",
  name: "Who's Next",
  order: 2,
  display: true,
},
{
  slug: "articles/featured-artists",
  name: "Featured Artists",
  order: 3,
  display: true,
},
{
  slug: "articles/entertainment-news",
  name: "Entertainment News",
  order: 4,
  display: true,
},
{
  slug: "articles/artist-of-the-month",
  name: "Artist of the Month",
  order: 5,
  display: true,
},];




const ResponsiveAppBar  = ({Authenticated=false}) => {



  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);




  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };




// if(userLoggedin === false){
//   return null;
// }
  return (
    <AppBar position="sticky" id='ign-navigation'  >
      <Container  maxWidth="xl">
        <Toolbar disableGutters>

          
      
         


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },width:'100%' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                width: '100vw',
                left: 0,
                right: 0,
                top: 0,
                
                '& .MuiPaper-root': {
                  width: '100vw', // Ensure the Menu content covers full width
                  maxWidth: '100vw',
                  paddingRight: '0px', // Removes extra right padding
                  
             
                },

                '& .MuiList-root':{
                  padding: 0,
                }
              }}
            >
              <Grid container justifyContent={"flex-start"} alignItems={"center"} sx={{backgroundColor: "#f0e6dc", padding: "15px 20px 8px"}}>
                  <Grid item> {Authenticated ? <AccountSettings /> : <SigninOrRegister/>}</Grid>
              </Grid>
              {pages.map(({name,slug}) => (
                <MenuItem className='here-and-now' key={slug} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link
                
                  to={slug}
                  style={{ textDecoration: 'none', color: 'black' }} 
                  >{name}</Link></Typography>
                </MenuItem>
              ))}


            </Menu>
          </Box>



          <Box sx={{ flexGrow: 1 ,display:{xs:'block',md:'none'}}}>
            <Ignlogo/>
            
            </Box>
                <Box component={"span"}  sx={{ flexGrow:1, display: { xs: 'none', md:'block' }}}>
                 
             
               <Grid container alignItems={"center"} >
                  <Grid item md={8}> <BrowserNavigation/></Grid>
                  <Grid  item md={4} >
                    <Grid container justifyContent={"flex-end"}>
                      <Grid item> {Authenticated ? <AccountSettings /> : <SigninOrRegister/>}</Grid>
                    </Grid>
                  </Grid>
                 </Grid>

                 </Box>

       
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
