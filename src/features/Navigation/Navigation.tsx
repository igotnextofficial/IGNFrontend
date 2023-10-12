import * as React from 'react';
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
import User from '../../models/users/User';
import AccountSettings from '../../components/navigation/AccountSettings';


const pages = [{title:'Who\'s Next',slug:'/whos-next'}, {title:'Featured Artists',slug:'/featured-artist'}, {title:'Music',slug:'/music'}];
const settings = [{title:'Profile',slug:'/profile'}, {title:'Account',slug:'/account'}, {title:'Dashboard',slug:'/dashboard'}, {title:'Logout',slug:'/logout'}];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const user = new User();

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

  return (
    <AppBar position="static"  sx={{backgroundColor:"#f86e51"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ display: { xs: 'none', md:'block' } , backgroundColor:'#9b4331'}}>
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
