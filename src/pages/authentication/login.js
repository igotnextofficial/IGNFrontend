import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';

import BackgroundCoverImage from '../../components/BackgroundCoverImage';
import Copyright from '../../components/Copyright';
import IGNButton from '../../components/Button';
import IgnForm from '../../components/IgnForm';
import Loader from '../../components/Loader';
import forms from '../../utils/forms';
import { Navigate } from 'react-router-dom';

import axios from 'axios';
import IgnRequest from '../../features/Http/IgnRequest';
import User from '../../Models/users/User';





const Login = ()=>{

    const user = new User();
    const loginUri = `https://${process.env.REACT_APP_USER_API_URI}`;
    const [successfulLogin,setSuccessfulLogin] = useState(false);
    const [hasErrors,setHasErrors] = useState(false);
    const [errMessage,setErrMessage] = useState('');
    const [loading,setLoading] = useState(false);

    const DisplayErrors = ({hasErrors = false,errorMessage = ""}) => {
        return errMessage.trim().length > 0 ? <p className='error'>{errorMessage}</p> : null;
    }

    const userLogin = async (data) => {
        const user = new User();
        let loggedIn = await user.login(data);
        if(loggedIn){
            setSuccessfulLogin(true);
        
        }
        else{
            setErrMessage('Username/Password does not match.')
        }
       
    }
    useEffect(() =>{
        // <Navigate to="/dashboard" replace={true} />
    },[successfulLogin])

    useEffect(() =>{
        setLoading(false)
    },[hasErrors])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        let data = new FormData(event.currentTarget);
        userLogin(data);
    }

    const theme = createTheme()
    

    return (
        <>

            {/* {user.isLoggedIn() &&(
                <Navigate to="/dashboard" replace={true} />
            )} */}



            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height:'100vh' }} spacing={2}>
                    <CssBaseline/>
                    <BackgroundCoverImage url="login.jpg" />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box sx={{ my: 8, mx: 4,position:'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', }} >

                               <Loader display={loading} />
                         
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5" mb={2}>
                                Sign in
                            </Typography>
                            <Box component="form" noValidate sx={{mt:1}} onSubmit={handleSubmit}>
                            <DisplayErrors hasErrors={hasErrors} errorMessage={errMessage}/>
                            <IgnForm formProperties={forms.login}  />
                                <IGNButton buttonLabel='Sign in'/>
                                 
                                <Grid container>
                                    <Grid item xs> 
                                        <Link href="#" variant="body2"  >
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item xs sx={{textAlign:'right'}}>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{mt:5}}/>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
    
  
        </>
    ) 

}

export default Login