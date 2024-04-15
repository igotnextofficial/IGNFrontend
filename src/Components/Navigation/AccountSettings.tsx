import React from 'react';

import { Avatar, Box, IconButton, Tooltip, Menu, MenuItem, Typography, Grid } from '@mui/material';

import { Roles } from '../../Types/Roles';
import CreateLink from './CreateLink';


import { Settings } from '../../Types/DataTypes';
import { useUser } from '../../Contexts/UserContext';

const AccountSettings = () => {
  const { user } = useUser()
  const settings: Settings[] = [
    {
      title: 'Profile',
      slug: '/profile'
    }, 
    { title: 'Account', slug: '/account' }, 
    { title: 'Dashboard', slug: `dashboard/${user?.role}` }, 
    { title: 'Logout', slug: '/logout' }];


  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  if(user?.role ===  Roles.ARTIST){
    settings.unshift({
       title: 'Find a mentor', slug: '/mentors/find-a-mentor' 
    })
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };




  return (

    <>
      <Box sx={{ flexGrow: 0 }}>

        <Tooltip title="Open settings">
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.fullname} src={user?.image} />
              </IconButton>
            </Grid>
            <Grid item> <Typography>Welcome, {user?.fullname} </Typography></Grid>
          </Grid>

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

          {settings.map(({ title, slug }) => (
            <MenuItem key={slug} onClick={handleCloseUserMenu}>

              <CreateLink title={title} slug={slug} />
            </MenuItem>
          ))}

        </Menu>
      </Box>
    </>
  )
}

export default AccountSettings