import React,{useContext} from 'react';

import { Avatar, Box, IconButton , Tooltip, Menu , MenuItem, Typography,Button } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../../Models/Users/User';
import CreateLink from './CreateLink';
import TemporaryDrawer from '../../Components/Navigation/LeftDrawer';

import { Settings } from '../../Types/DataTypes';
import { UserContext } from '../../Contexts/UserContext';

const AccountSettings  = () => {
  const {user} = useContext(UserContext)
  const settings:Settings[] = [
      {
        title:'Profile',
        slug:'/profile'
      }, {title:'Account',slug:'/account'}, {title:'Dashboard',slug:`dashboard/${user?.role}`}, {title:'Logout',slug:'/logout'}];


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
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src={user?.image} />
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
          
                  <CreateLink title={title} slug={slug} />
                </MenuItem>
              ))}
             
            </Menu>
          </Box>
    </> 
    )
}

export default AccountSettings