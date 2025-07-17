import React, {useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar, Box, CssBaseline, Grid, Paper, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '../../components/Copyright';
import RegisterMentorForm from '../../forms/RegisterMentorForm';
import { useUser } from '../../contexts/UserContext';
import { Roles } from '../../types/Roles';
import { useValueWithTimezone } from '@mui/x-date-pickers/internals/hooks/useValueWithTimezone';
import { APP_ENDPOINTS } from '../../config/app';
import useHttp from '../../customhooks/useHttp';


const RegisterMentor = () => {
    const theme = createTheme();
    const { user } = useUser()
    const [searchParams] = useSearchParams();
    const token = searchParams.get('invite_token');
    const { post } = useHttp();

    const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
        if (!token) return;
        try {
            const response = await post(APP_ENDPOINTS.USER.MENTOR.VALIDATE_INVITE, { token });
            if (response.status === 200) {
                // Token is valid, proceed with registration
                return true;
            } else {
              return false;
            }
        } catch (error) {
            console.error("Error validating token:", error);
            return false
            // Handle error, e.g., show a notification or redirect
        }
    };

    validateToken().then(isValid => {
        if (!isValid) {
            console.log("token is not valid")
            // navigate('/'); // Redirect to login if token is invalid
        };
     }
    );
  }, []);


 
  if (!token) return null; // prevent flicker
    
    return  (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ minHeight: '100vh', display: 'flex' }} spacing={2}>
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
                        display: { xs: 'none', sm: 'block' },
                    }}>
                </Grid>
                <Grid 
                    item 
                    xs={12} 
                    sm={8} 
                    md={5} 
                    component={Paper} 
                    elevation={6} 
                    square
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: { xs: '100vh', sm: 'auto' }
                    }}
                >
                    <Box 
                        sx={{ 
                            flex: 1,
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            py: { xs: 2, sm: 4 }
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" mb={2}>
                            Register Mentor
                        </Typography>
                        <Box component="div" sx={{ mt: 1, width: '100%', flex: 1 }}>
                            <RegisterMentorForm />
                            <Grid container justifyContent="flex-end">
                                <Grid item>
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
    );
};

export default RegisterMentor;