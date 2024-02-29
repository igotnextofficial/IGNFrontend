import React, { useContext, useEffect, useState } from 'react';
import { httpDataObject } from '../../Types/DataTypes';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

import Copyright from '../../Components/Copyright';
import IGNButton from '../../Components/Button';
import { UserContext } from '../../Contexts/UserContext';
import { ErrorContext } from '../../Contexts/ErrorContext';
import { Navigate } from 'react-router-dom';

import { SelectChangeEvent } from '@mui/material/Select';
import User from '../../Models/Users/User';




const Register = ()=>{

    const {user,isLoggedin,attemptLoginOrLogout }= useContext(UserContext)
    const [role, setRole] = useState('');


    const {updateError} = useContext(ErrorContext)
    const [data,setData] = useState<httpDataObject | null>(null);
    const [registration,setAttemptRegistration] = useState(false);
    

    const [hasEffectRun, setHasEffectRun] = useState(false);
    const handleRoleChange = (event: SelectChangeEvent<typeof role>) => {
        setRole(event.target.value as typeof role);
    };
    useEffect(() => {
        let isMounted = true; // flag to track if the component is mounted

        const registerUser = async () => {
            if (!data || !hasEffectRun) {
                return;
            }

            try {
                const userObj = new User()
                const response = await userObj.register(data);
                if (!response) {
                    isMounted && updateError?.("The account could not be created.");
                    return;
                }
                const { email, password } = data.data as { email?: string, password?: string };
                const loginData = {
                    'data':{
                        'email':email,
                        'password':password
                    }
                }
                const loginResponse = await attemptLoginOrLogout(true,loginData);
                if (!loginResponse && isMounted) {
                    updateError?.("The user could not be logged in");
                }
            } catch (error) {
                // Handle or log error
                isMounted && updateError?.("An error occurred during registration or login.");
            }
        };

        registerUser();

        // Set hasEffectRun to true after first execution
        setHasEffectRun(true);

        // Cleanup function
        return () => {
            isMounted = false;
        };

    }, [data, user, updateError, registration]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formDataObject = Object.fromEntries(formData.entries());
        const userData = {
            data: {
                ...formDataObject,
                role: role // Add
            }
        };

        setData(userData);
        setAttemptRegistration(true)
   

    }
    type TextFieldVariant = "filled" | "outlined" | "standard";
    type TextFieldMargin = "normal" | "none" | "dense" ;
    const props = 
    {
       name  : {
            required: true,
            fullWidth: true,
            id: 'name',
            name: 'name',
            label: "fullname",
            variant: "filled" as TextFieldVariant  ,
            margin: 'normal' as TextFieldMargin
        },
        email  : {
            required: true,
            fullWidth: true,
            id: 'email',
            name: 'email',
            label: "Email Address",
            variant: "filled" as TextFieldVariant  ,
            margin: 'normal' as TextFieldMargin
        },
        password: {
            required: true,
            fullWidth: true,
            name: 'password',
            label: 'Password',
            type: 'password',
            id: 'password',
            autoComplete: 'current-password',
            variant: "filled" as TextFieldVariant ,
            margin: 'normal' as TextFieldMargin
        },
        username: {
            required: true,
            fullWidth: true,
            name: 'username',
            label: 'Username',
            type: 'text',
            id: 'username',
            variant: "filled" as TextFieldVariant,
            margin: 'normal' as TextFieldMargin
        }
    }

    const theme = createTheme()
    return (
        <>
              {isLoggedin &&(
                <Navigate to="/dashboard" replace={true} />
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
                            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                            <TextField {...props.name} />
                                <TextField {...props.email} />
                                <TextField {...props.password} />
                                <TextField {...props.username} />
                                <FormControl fullWidth variant='filled'>
                                    <InputLabel id="role-label">Role</InputLabel>
                                    <Select
                                        labelId='role-label'
                                        value={role}
                                        label="Role"
                                        onChange={handleRoleChange}
                                    >
                                        <MenuItem value={'admin'}>admin</MenuItem>
                                        <MenuItem value={'artist'}>Artist</MenuItem>
                                        <MenuItem value={'default'}>Listener</MenuItem>
                                    </Select>
                                </FormControl>
                                <IGNButton buttonLabel='Register' />
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

export default Register