import React from 'react';
import { Avatar, Box, IconButton , Tooltip, Menu , MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../../models/users/User';

const AccountSettings  = () => {
    const settings = [{title:'Profile',slug:'/profile'}, {title:'Account',slug:'/account'}, {title:'Dashboard',slug:'/dashboard'}, {title:'Logout',slug:'/logout'}];


    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const user = new User();
  

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  

  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    return (
       user.isLoggedIn() ? 
    <>
     <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.get()['name']} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({title,slug}) => (
                <MenuItem key={slug} onClick={handleCloseUserMenu}>
             
                  <Link to={slug}><Typography sx={{color:'#1d1917'}} textAlign="center">{title}</Typography></Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    </> : null
    )
}

export default AccountSettings