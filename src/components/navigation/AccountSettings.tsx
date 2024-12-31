import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Box, IconButton, Tooltip, Menu, MenuItem, Typography, Grid } from '@mui/material';

import { Roles } from '../../types/Roles';
import CreateLink from './CreateLink';


import { Settings } from '../../types/DataTypes';
import { useUser } from '../../contexts/UserContext';

const AccountSettings = () => {
  const [role,setRole] = useState("")
  const [settings, setSettings] = useState<Record<string,string>[]>([
    { title: 'Account', slug: '/edit-profile' }, 
    { title: 'Dashboard', slug: `dashboard/${role}` }, 
    { title: 'Logout', slug: '/logout' }
  ])
  const { user } = useUser()

  useEffect(() => {
  console.log(`looking at the user  role ${user?.role.type}`)
    const user_role = user?.role.type || "artist"
    setRole(user_role)
    console.log(`The user role is ${user_role}`)

  }, [user])
 

  useEffect(() => {
    if(role ===  Roles.ARTIST && user?.mentor === null){
      setSettings( (prevSettings) => {
          return  [{title: 'Find a mentor', slug: '/mentors/find-a-mentor'}, ...prevSettings]
      });
  }
 
  }, [role])


  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  // if(role ===  Roles.ARTIST && user?.mentor === null){
  //   settings.unshift({
  //      title: 'Find a mentor', slug: '/mentors/find-a-mentor' 
  //   })
  // }

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