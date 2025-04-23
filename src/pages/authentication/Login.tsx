import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Container, Divider, Fade, Slide } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Navigate } from 'react-router-dom';
import { keyframes } from '@mui/system';

import BackgroundCoverImage from '../../components/BackgroundCoverImage';
import Copyright from '../../components/Copyright';
import IGNButton from '../../components/Button';
import { useUser } from '../../contexts/UserContext';
import IgnFormGenerate from '../../components/IgnFormGenerate';
import { LoginFormStructure } from '../../formstructures/LoginFormStructure';
import FormDataProvider from '../../providers/FormDataProvider';
import User from '../../models/users/User';
import { useFormDataContext } from '../../contexts/FormContext';
import { useErrorHandler } from '../../contexts/ErrorContext';
import LoadingComponent from '../../components/common/LoadingComponent';

const userClass = new User()

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginDisplay = () => {
    const { user, isLoggedin, attemptLoginOrLogout, loading } = useUser();
    const { data, isValid } = useFormDataContext();
    const { updateError } = useErrorHandler();
    const [refreshPage, setRefreshPage] = React.useState<boolean>(false);

    useEffect(() => {
        if (isLoggedin && user) {
            setRefreshPage(true);
        }
    }, [isLoggedin, user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isValid) {
            try {
                const response = await attemptLoginOrLogout(true, { data });
                if (!response) {
                    updateError?.("Issue with logging in user");
                }
            } catch (error) {
                console.error("Login error:", error);
                updateError?.("Issue with logging in user");
            }
        }
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
            background: {
                default: '#f5f5f5',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h5: {
                fontWeight: 600,
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#1976d2',
                            },
                        },
                        '& .MuiFilledInput-root': {
                            '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                            },
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        },
                    },
                },
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
            {refreshPage && (
                <Navigate to={`/dashboard/${user?.role.type}`} replace={true} />
            )}

            {loading && <LoadingComponent />}

            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                {/* Left side - Background Image */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/images/login.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            transition: 'background-color 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        }
                    }}
                >
                    <Fade in timeout={1000}>
                        <Box
                            sx={{
                                position: 'relative',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white',
                                textAlign: 'center',
                                px: 4,
                            }}
                        >
                            <Typography 
                                variant="h3" 
                                component="h1" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 700,
                                    animation: `${fadeIn} 0.8s ease-out`,
                                    mb: 0,
                                    color: '#FBFAF9',
                                }}
                            >
                                Welcome Back
                            </Typography>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    maxWidth: 400, 
                                    animation: `${fadeIn} 0.8s ease-out 0.2s both`,
                                    opacity: 0.9,
                                    color: '#FBFAF9',
                                }}
                            >
                                Sign in to continue your journey with us
                            </Typography>
                        </Box>
                    </Fade>
                </Grid>

                {/* Right side - Login Form */}
                <Slide direction="left" in timeout={800}>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Container maxWidth="sm">
                            <Box
                                sx={{
                                    my: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Fade in timeout={1000}>
                                    <Avatar 
                                        sx={{ 
                                            m: 1, 
                                            bgcolor: 'secondary.main', 
                                            width: 56, 
                                            height: 56,
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                    >
                                        <LockOutlinedIcon sx={{ fontSize: 32 }} />
                                    </Avatar>
                                </Fade>
                                <Typography 
                                    component="h1" 
                                    variant="h5" 
                                    sx={{ 
                                        mb: 3, 
                                        fontWeight: 600,
                                        animation: `${fadeIn} 0.8s ease-out 0.4s both`,
                                    }}
                                >
                                    Sign in
                                </Typography>

                                <Box 
                                    component="form" 
                                    noValidate 
                                    onSubmit={handleSubmit} 
                                    sx={{ 
                                        width: '100%',
                                        animation: `${fadeIn} 0.8s ease-out 0.6s both`,
                                    }}
                                >
                                    <IgnFormGenerate formStructures={LoginFormStructure} />
                                    
                                    <IGNButton 
                                        buttonLabel='Sign in'
                                        disabled={loading}
                                        onClick={handleSubmit}
                                        sx={{ 
                                            mt: 3, 
                                            mb: 2, 
                                            py: 1.5,
                                            width: '100%',
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            position: 'relative',
                                            overflow: 'hidden',
                                            backgroundColor: '#1d1917',
                                            color: '#FBFAF9',
                                            '&:hover': {
                                                backgroundColor: '#2d2927',
                                            },
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                                                transform: 'translateX(-100%)',
                                                transition: 'transform 0.6s ease',
                                            },
                                            '&:hover::after': {
                                                transform: 'translateX(100%)',
                                            },
                                        }}
                                    />

                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} sm={6}>
                                            <Link 
                                                href="#" 
                                                variant="body2"
                                                sx={{ 
                                                    textDecoration: 'none',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': { 
                                                        textDecoration: 'underline',
                                                        color: 'primary.main',
                                                    }
                                                }}
                                            >
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
                                            <Link 
                                                href="/register" 
                                                variant="body2"
                                                sx={{ 
                                                    textDecoration: 'none',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': { 
                                                        textDecoration: 'underline',
                                                        color: 'primary.main',
                                                    }
                                                }}
                                            >
                                                Don't have an account? Sign Up
                                            </Link>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 4 }} />

                                    <Copyright />
                                </Box>
                            </Box>
                        </Container>
                    </Grid>
                </Slide>
            </Grid>
        </ThemeProvider>
    )
}

export const Login = () => {
    return (
        <FormDataProvider validations={userClass.validateLoginForm()} formKeys={userClass.validateLoginForm()}>
            <LoginDisplay />
        </FormDataProvider>
    )
}

export default Login