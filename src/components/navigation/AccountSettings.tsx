import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Box, IconButton, Tooltip, Menu, MenuItem, Typography, Grid } from '@mui/material';

import { Roles } from '../../types/Roles';
import CreateLink from './CreateLink';


import { Settings } from '../../types/DataTypes';
import { useUser } from '../../contexts/UserContext';
import {v4 as uuidv4} from 'uuid'

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
    const user_role = user?.role.type || ""; 
    setRole(user_role)
    // console.log(`The user role is ${user_role}`)

  }, [user])
 

  useEffect(() => {
    let user_settings:Record<string,string>[] = [
      { title: 'Account', slug: '/edit-profile' }, 
      { title: 'Dashboards', slug: `dashboard/${role}` }, 
      { title: 'Logout', slug: '/logout' }
    ];
    
    if(role ===  Roles.ARTIST){
      user_settings = addMenuItem(user_settings, { title: 'Find a mentor', slug: '/mentors/find-a-mentor' })
    }
    
    if(role ===  Roles.MENTOR){
      user_settings = addMenuItem(user_settings, { title: 'Schedule Availability', slug: '/schedule-availability' })
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
          sx={{ 
            mt: '30px',
            '& .MuiPaper-root': {
              width: '100vw',
            
            }
          }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map(({ title, slug }) => (
            <Link key={uuidv4()} to={slug}>
              <MenuItem key={slug} onClick={handleCloseUserMenu}>
                <Typography
                  sx={{ display: 'block', color: '#1d1917', fontSize: '1.2em' }}
                  component="p"
                  variant="body2"
                >
                  {title}
                </Typography>
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Box>
    </>
  )
}

export default AccountSettings