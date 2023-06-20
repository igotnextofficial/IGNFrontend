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

import axios from 'axios';
import { useHistory } from "react-router-dom"




const Login = ()=>{
    
    console.log(process.env.REACT_APP_USER_API_URI)
    const loginUri = `https://shield.igotnext.local/api/login`;
    const [successfulLogin,setSuccessfulLogin] = useState(false);
    const [accessToken,setAccessToken] = useState('');
    const [hasErrors,setHasErrors] = useState(false);
    const [errMessage,setErrMessage] = useState('');
    const [loading,setLoading] = useState(false);
    let history = useHistory();

    const DisplayErrors = ({hasErrors = false,errorMessage = ""}) => {
        return hasErrors ? <h3>{errorMessage}</h3> : null;
    }
    useEffect(()=>{
     if(successfulLogin){
        setTimeout(()=> {
            history.push('/dashboard')
        },1000)
     }
       
    },[successfulLogin])

    useEffect(() =>{
        setLoading(false)
    },[hasErrors])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        
        let data = new FormData(event.currentTarget);
        let wrappedData = {data:{}}
        for(const [key,value] of data){
            wrappedData.data[key] = value;
        }

        try {
            let response = await axios.post(loginUri,wrappedData);
            
            if(response.status === 204){
                setHasErrors(true);
                setErrMessage('The user is already logged in');
            }
            else if(response.status === 200){
                setSuccessfulLogin(true);    
            }
            else{
                setErrMessage('user could not be logged in.')
            }

        } catch (error) {
            setHasErrors(true);
            
            if(error.response){
                if(error.response.status === 404){
                    setErrMessage('The user does not exist');
                 }
     
                 if(error.response.status === 400){
                    setErrMessage('username/password is invalid...')
                 }

            }
            else{
                setErrMessage('Something went wrong...')
            }
           
       
  
        }
        //save access token
        

    }

    const theme = createTheme()
    const [formData,setFormData] = useState({});
    
    const handleOnChange = (event) =>{
        const { name, value} = event.target;
        setFormData( (previousData)  => {
            return { 
                ...previousData,
                [name] : value
            }
        })

    }

    return (
        <>
            
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