import React, { useEffect } from 'react';
import { httpDataObject, HttpMethods } from '../../types/DataTypes';
import { Avatar, Box, CssBaseline, Grid, Paper, Typography, Link, Container, Divider, Fade, Slide } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { keyframes } from '@mui/system';

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

const user = new User();

const RegisterUserAttempt = async (data: httpDataObject) => {
    let url = process.env.REACT_APP_REGISTER_API || "";
    const response = await sendRequest(HttpMethods.POST, url, data);
    if (response !== null) {
        return response;
    }
    else return null;
}

const RegisterDisplay = () => {
    const { user, isLoggedin, attemptLoginOrLogout } = useUser();
    const { data, isValid } = useFormDataContext();
    const { updateError } = useErrorHandler();
    const [refreshPage, setRefreshPage] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        if (isLoggedin && user) {
            setRefreshPage(true);
        }
    }, [isLoggedin, user]);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isValid) {
            setIsLoading(true);
            try {
                const response = await RegisterUserAttempt({ data });
                if (response) {
                    if (response.errors?.length) {
                        updateError?.(response.errors.join(' '));
                    } else {
                        const loginResponse = await attemptLoginOrLogout(true, { data });
                        if (!loginResponse) {
                            updateError?.("The user could not be logged in");
                        }
                    }
                } else {
                    updateError?.("Issues with registering user");
                }
            } finally {
                setIsLoading(false);
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
    });

    return (
        <>
            {refreshPage && (
                <Navigate to={`/dashboard/${user?.role.type}`} replace={true} />
            )}

            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    {/* Left side - Background Image */}
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(/images/mentorship-bg.jpg)',
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
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
                                    Join Our Mentorship Community
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
                                    Connect with industry experts and grow your career in music and entertainment
                                </Typography>
                            </Box>
                        </Fade>
                    </Grid>

                    {/* Right side - Register Form */}
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
                                        Create Account
                                    </Typography>

                                    <Box 
                                        component="div" 
                                        sx={{ 
                                            width: '100%',
                                            animation: `${fadeIn} 0.8s ease-out 0.6s both`,
                                        }}
                                    >
                                        <IgnFormGenerate formStructures={RegisterFormStructure} />
                                        
                                        <IGNButton 
                                            buttonLabel='Register'
                                            disabled={isLoading}
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
                                        
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                <Link href="/login" variant="body2">
                                                    Already have an account? Sign in
                                                </Link>
                                            </Grid>
                                        </Grid>
                                        
                                        <Copyright sx={{ mt: 5 }} />
                                    </Box>
                                </Box>
                            </Container>
                        </Grid>
                    </Slide>
                </Grid>
            </ThemeProvider>
        </>
    );
}

export const Register = () => {
    return (
        <FormDataProvider validations={user.validateRegistrationForm()} formKeys={user.validationIntialStates()}>
            <RegisterDisplay />
        </FormDataProvider>
    )
}

export default Register;