import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Box, IconButton, Tooltip, Menu, MenuItem, Typography, Grid } from '@mui/material';

import { Roles } from '../../types/Roles';
import CreateLink from './CreateLink';


import { Settings } from '../../types/DataTypes';
import { useUser } from '../../contexts/UserContext';

const addMenuItem  = (current_menu:Record<string,string>[], menu_item:Record<string,string>) => {
  let has_menu_item = current_menu.some((item) => item.title === menu_item.title);
  if(has_menu_item){
    return current_menu;
  }
  return [ menu_item,...current_menu]
}
const AccountSettings = () => {
  const [role,setRole] = useState("")
  const [settings, setSettings] = useState<Record<string,string>[]>([])
  const { user } = useUser()

  useEffect(() => {
  // console.log(`looking at the user  role ${user?.role.type}`)
    const user_role = user?.role.type || "artist"
    setRole(user_role)
    // console.log(`The user role is ${user_role}`)

  }, [user])
 

  useEffect(() => {
    let user_settings:Record<string,string>[] = [
      { title: 'Account', slug: '/edit-profile' }, 
      { title: 'Dashboard', slug: `dashboard/${role}` }, 
      { title: 'Logout', slug: '/logout' }
    ];
    
    if(role ===  Roles.ARTIST){
      user_settings = addMenuItem(user_settings, { title: 'Find a mentor', slug: '/mentors/find-a-mentor' })
    }
    setSettings(user_settings);
  }, [role])


  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);




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
                <Avatar alt={user?.fullname} src={user?.profile_photo_path} />
              </IconButton>
            </Grid>
            <Grid item> <Typography sx={{color:"#1d1917"}}>Welcome, {user?.fullname} </Typography></Grid>
          </Grid>

        </Tooltip>
        <Menu
          sx={{ mt: '45px' ,

            display: { xs: 'block', md: 'block' },
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
            <Link to={slug}>
            <MenuItem key={slug} onClick={handleCloseUserMenu}>

              <CreateLink title={title} slug={slug} />
            </MenuItem>
            </Link>
          ))}

        </Menu>
      </Box>
    </>
  )
}

export default AccountSettings