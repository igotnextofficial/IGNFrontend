import React, {  } from 'react';
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


import { Navigate } from 'react-router-dom';

import { useUser } from '../../contexts/UserContext';
import IgnFormGenerate from '../../components/IgnFormGenerate';
import { LoginFormStructure } from '../../formstructures/LoginFormStructure';
import FormDataProvider from '../../providers/FormDataProvider';
import User from '../../models/users/User';
import { useFormDataContext } from '../../contexts/FormContext';
import { useErrorHandler } from '../../contexts/ErrorContext';




const userClass = new User()

const LoginDisplay = ()=>{
    const {updateError} = useErrorHandler()
    const {user,isLoggedin,attemptLoginOrLogout }= useUser();
    const {data,isValid} = useFormDataContext()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(isValid){

            const response = await attemptLoginOrLogout(true,{data})
        //    console.log("response from login ")
        //    console.log(`the response from login is ${response}`)
        //    console.log(response)
            if(!response){
                // console.log("issue with logging in user")
                // console.log(JSON.stringify(response))
                updateError("Issue with logging in user ")
            }
        }
    }
       
   

    const theme = createTheme()
    

    return (
        <>

{isLoggedin && user  &&(
                <Navigate to={`/dashboard/${user?.role.type}`} replace={true} />
            )}


            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height:'100vh' }}  spacing={2}>
                    <CssBaseline/>
                    <Grid item xs={0} sm={0} md={0}>
                        <BackgroundCoverImage url="https://localhost:3000/images/login.jpg" />  
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box sx={{ my: 8, mx: 4,position:'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', }} >

                       
                         
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5" mb={2}>
                                Sign in
                            </Typography>
                            <Box component="form" noValidate sx={{mt:1}} onSubmit={handleSubmit}>
                        
                            <IgnFormGenerate formStructures={LoginFormStructure} />
                          
                                <IGNButton buttonLabel='Sign in'/>
                                 
                                <Grid container>
                                    <Grid item  > 
                                        <Link href="#" variant="body2"  >
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item   sx={{textAlign:'right'}}>
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

export const Login = () => {
    return (
        <FormDataProvider validations={userClass.validateLoginForm()} formKeys={userClass.validateLoginForm()}>
            <LoginDisplay/>
        </FormDataProvider>
    )
}
export default Login