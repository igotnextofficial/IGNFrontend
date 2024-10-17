import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { UserContext } from '../../contexts/UserContext';

// Make sure 'user' is defined or imported in your component if it's used

const CreateLink = ({ title, slug }: { title: string; slug: string }) => {
    const {attemptLoginOrLogout } =  useContext(UserContext)
    const [refresh, setRefresh] = useState(false)
  const handleLogout = async () => {
    try {
      let success = await attemptLoginOrLogout(false);
      if(success){
        setRefresh(refresh)
      }
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
