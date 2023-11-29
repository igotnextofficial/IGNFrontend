import React, { useEffect, useState,useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';

import BackgroundCoverImage from '../../Components/BackgroundCoverImage';
import Copyright from '../../Components/Copyright';
import IGNButton from '../../Components/Button';
import IgnForm from '../../Components/IgnForm';
import Loader from '../../Components/Loader';
import forms from '../../Utils/forms';
import { Navigate } from 'react-router-dom';

import axios from 'axios';
import IgnRequest from "../../Features/Http/IgnRequest";
import { UserContext } from '../../Contexts/UserContext';
import { httpDataObject } from '../../Types/DataTypes';






const Login = ()=>{
    const {user,isLoggedin,attemptLoginOrLogout }= useContext(UserContext);
    const [successfulLogin,setSuccessfulLogin] = useState(false);
    const [hasErrors,setHasErrors] = useState(false);
    const [errMessage,setErrMessage] = useState('');
    const [loading,setLoading] = useState(false);

    const DisplayErrors = ({hasErrors = false,errorMessage = ""}) => {
        return errMessage.trim().length > 0 ? <p className='error'>{errorMessage}</p> : null;
    }

    const userLogin = async (data:httpDataObject) => {
   
        let loggedIn = await attemptLoginOrLogout(true,data);
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        
        const formData = new FormData(event.currentTarget);
        const data =Object.fromEntries(formData.entries())
        userLogin({"data":data});
    }

    const theme = createTheme()
    

    return (
        <>

            {isLoggedin &&(
                <Navigate to="/dashboard" replace={true} />
            )}



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