import React, { useEffect } from 'react';
import { httpDataObject, HttpMethods } from '../../types/DataTypes';
import { Avatar,Box,CssBaseline,Grid,Paper,Typography,Link} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '../../components/Copyright';
import IGNButton from '../../components/Button';

import { useUser } from '../../contexts/UserContext';
import { useErrorHandler } from '../../contexts/ErrorContext';

import { Navigate } from 'react-router-dom';

import { sendRequest } from '../../utils/helpers';

import IgnFormGenerate from '../../components/IgnFormGenerate';
import { RegisterFormStructure } from '../../formstructures/RegisterFormStructure';
import FormDataProvider from '../../providers/FormDataProvider';

import User from '../../models/users/User';
import { useFormDataContext } from '../../contexts/FormContext';


const user = new User()
const RegisterUserAttempt = async (data:httpDataObject) => {

    let url = process.env.REACT_APP_REGISTER_API || ""
    const response = await sendRequest(HttpMethods.POST,url,data);
    if(response !== null){
        return response
    }
    else return null
}

const RegisterDisplay = ()=>{

    const {user,isLoggedin,attemptLoginOrLogout } = useUser()
    const{data,isValid} = useFormDataContext()
    const {updateError} = useErrorHandler()
    const [refreshPage, setRefreshPage] = React.useState<boolean>(false);
    useEffect(() => {
        // console.log(`login is now ${isLoggedin} and user is ${user}`)
        if(isLoggedin && user){
            // console.log(`login has changed and user `)
           setRefreshPage(true);
        }
    },[isLoggedin,user]);

    const handleSubmit = async (event:  React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(isValid){
           const response = await RegisterUserAttempt({data});
           if (response) {
           
            if (response.errors?.length) {
                updateError?.(response.errors.join(' '));
            } else {
                // Proceed with login attempt if there are no registration errors
                const loginResponse = await attemptLoginOrLogout(true, { data });
                if (!loginResponse) {
                    updateError?.("The user could not be logged in");
                }
            }
        } else {
            updateError?.("Issues with registering user");
        }
       
         
        }

    }

  

    const theme = createTheme()
    return (
        <>
              {refreshPage &&(
                <Navigate to={`/dashboard/${user?.role.type }`} replace={true} />
            )}

            <ThemeProvider theme={theme}>
               
                <Grid container component="main" sx={{ height: '100vh' }} spacing={2}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(/images/login.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" mb={2}>
                                Register Account
                            </Typography>
                            <Box component="div" sx={{ mt: 1 }} >
                            
                            <IgnFormGenerate formStructures={RegisterFormStructure} />
                            <IGNButton buttonLabel='Register' onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleSubmit(event)} />
                                <Grid container>
                                    <Grid item xs>
                                        {/* Other link or content if needed */}
                                    </Grid>
                                    <Grid item xs>
                                        <Link href="/login" variant="body2">
                                            {"Already have an account? Sign in"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
}

export const Register = () => {
    return (
        <FormDataProvider validations={user.validateRegistrationForm()} formKeys={user.validationIntialStates()}>
            <RegisterDisplay/>
        </FormDataProvider>
    )
}
export default Register