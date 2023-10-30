import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import User from '../../Models/users/User';
import { UserContext } from '../../Contexts/UserContext';

// Make sure 'user' is defined or imported in your component if it's used

const CreateLink = ({ title, slug }: { title: string; slug: string }) => {
    const user = useContext(UserContext);
  const handleLogout = async () => {
    try {
      let success = await user.logout();
      success ? alert("successful") : alert("unsuccessful");
    } catch (error) {
      console.error("Logout error: ", error);
      alert("unsuccessful");
    }
  };

  if (title.toLowerCase() === 'logout') {
    return (
      <Button 
        variant="text" 
        onClick={handleLogout}
      >
        {title}
      </Button>
    );
  }

  return (
    <Link to={slug}>
      <Typography sx={{color:'#1d1917'}} textAlign="center">
        {title}
      </Typography>
    </Link>
  );
};

export default CreateLink;
