import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Ignlogo from '../../components/Ignlogo';
import { Link } from 'react-router-dom';

import AccountSettings from '../../components/navigation/AccountSettings';



const pages = [{title:'Who\'s Next',slug:'/whos-next'}, {title:'Featured Artists',slug:'/featured-artist'}, {title:'Music',slug:'/music'}];




const ResponsiveAppBar  = () => {


  const userLoggedin = true;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


// if(userLoggedin === false){
//   return null;
// }
  return (
    <AppBar position="sticky"  sx={{backgroundColor:"#fd2f30"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ display: { xs: 'none', md:'block' } , backgroundColor:'#cf1d1d'}}>
         <Link to={"/"}> <Ignlogo /></Link>
         </Box>
         


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              }}
            >
              {pages.map(({title,slug}) => (
                <MenuItem key={slug} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link to={slug}>{title}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 ,display:{xs:'block',md:'none'}}}>
            <Ignlogo/>
            </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({title,slug}) => (
              <Button
                key={slug}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={slug}>{title}</Link>
              </Button>
            ))}
          </Box>

         <AccountSettings />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;