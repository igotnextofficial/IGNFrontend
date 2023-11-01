import React, { useContext, useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import BackgroundCoverImage from '../../components/BackgroundCoverImage';
import IGNButton from '../../components/Button';
import Copyright from '../../components/Copyright';
import IgnForm from '../../components/IgnForm';
import Loader from '../../components/Loader';

import forms from '../../utils/forms';

import { UserContext } from '../../Contexts/UserContext';
import { ErrorContext } from '../../Contexts/ErrorContext';

const Login = ()=>{

    const {isLoggedin,attemptLoginOrLogout }= useContext(UserContext)
    const {updateError} = useContext(ErrorContext);
    const [loading,setLoading] = useState(false); // this will be moved to a context
    
    const [attemptLogin,setAttemptLogin] = useState(false)
    const [data,setData] = useState(null)
    const [ignore,setIgnore] = useState(true)



    const userLogin = async (data) => {
        let response  = await attemptLoginOrLogout(true,data);
        
        if(!response){ // attempting to log user in
            updateError("User not found or incorrect credentials. Please try again.")
        }
       
    }


    useEffect(() =>{
        if(!ignore){
           userLogin(data);
        }
       
        
        return (()=>{
           setIgnore(true)
           setAttemptLogin(false)
        })
    },[attemptLogin])

    const handleSubmit = async (event) => {
        event.preventDefault();
        //trigger loading...
        
        let formData = new FormData(event.currentTarget);
        setData(formData);
        setIgnore(false)
        setAttemptLogin(true)
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