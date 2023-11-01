import React, { useContext, useEffect, useState } from 'react';
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

import Copyright from '../../components/Copyright';
import IGNButton from '../../components/Button';
import { UserContext } from '../../Contexts/UserContext';
import { ErrorContext } from '../../Contexts/ErrorContext';
import { Roles } from '../../types/Roles';
import { Navigate } from 'react-router-dom';




const Register = ()=>{
    const {user, isLoggedin }= useContext(UserContext)
    const {updateError} = useContext(ErrorContext)
    const [data,setData] = useState(null);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState(Roles.DEFAULT)
    const [registration,setAttemptRegistration] = useState(null);
    const [ignore,setIgnore] = useState(true)
    const [redirectToDashboard,setRedirectToDashboard] = useState(false)
    

    useEffect(()=> {
        if(!ignore){
            
      
            const RegisterUser = async() => {
                const response =  await user.Register(data);
                if(response){
                    
                    const successful = await user.login({data:{
                        email:email,
                        password:password
                    }})

                    if(successful){
                        setRedirectToDashboard(true)
                    }
                    else{
                        updateError(`The User ${email} could not be logged in. `)
                    }
                }
                else{
                    updateError(`We could not create account for ${email}`)
                }

                setRedirectToDashboard(true)
            }

            RegisterUser();
        }


        return (() =>{
            setIgnore(true)
        })
       
    },[registration])

    const handleChange = (event)  =>{
        setRole(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const userData = {
            data: Object.fromEntries(formData.entries()),
        };
        userData.data.role = role;
        setEmail(userData.data.email)
        setPassword(userData.data.password)
        setData(userData);
        setIgnore(false);
        setAttemptRegistration(true)
   

    }

    const props = 
    {
            email:
            {
                required:true,
                fullWidth:true,
                id:'email',
                name:'email',
                label:"Email Address",
                variant:"filled",
                margin: 'normal'
           
            },
            password:
            {
                required:true,
                fullWidth:true,
                name:'password',
                label:'password',
                type:'password',
                id:'password',
                autoComplete:'current-password',
                variant:'filled',
                margin: 'normal'
            }
            ,
            username:
            {
                required:true,
                fullWidth:true,
                name:'username',
                label:'username',
                type:'text',
                id:'username',
                variant:'filled',
                margin: 'normal'
            },

           name:
            {
                required:true,
                fullWidth:true,
                name:'name',
                label:'fullname',
                type:'text',
                id:'fullname',
                variant:'filled',
                margin: 'normal'
            }
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
                    <Grid          
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(/images/login.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                    }}>

                    </Grid>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5" mb={2}>
                               Register Account
                            </Typography>
                            <Box component="form" noValidate sx={{mt:1}} onSubmit={handleSubmit}>
                                <TextField {...props.name}></TextField>
                                <TextField {...props.email}></TextField>
                                <TextField {...props.password}></TextField>
                                <TextField {...props.username}></TextField>
                                <FormControl fullWidth variant='filled'>
                                    <InputLabel id="role-label">Role</InputLabel> 
                                    <Select
                                    value={role}
                                    onChange={handleChange}
                                    labelId='role-label'>
                                    <MenuItem  value={Roles.ADMIN}>{Roles.ADMIN}</MenuItem>
                                    <MenuItem  value={Roles.WRITER}>{Roles.WRITER}</MenuItem>
                                    <MenuItem  value={Roles.ARTIST}>{Roles.ARTIST}</MenuItem>
                                    <MenuItem value={Roles.SUBSCRIBER}>{Roles.SUBSCRIBER}</MenuItem>
                                    <MenuItem value={Roles.DEFAULT}>{Roles.DEFAULT}</MenuItem>
                                    </Select>
                                </FormControl>
                                <IGNButton buttonLabel='Register'/>
                                 
                                <Grid container>
                                    <Grid item xs> 
                                        <Link href="#" variant="body2"  >
                                     
                                        </Link>
                                    </Grid>
                                    <Grid item xs>
                                        <Link href="/login" variant="body2">
                                            {"Already have an account? Sign in"}
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

export default Register