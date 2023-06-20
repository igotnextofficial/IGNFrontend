import React from 'react';
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



const Register = ()=>{

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('The data is: ')
        console.log(event.currentTarget)
        let data = new FormData(event.currentTarget);
        if(true){ //send data successful
            //route to user dashboard
        }
        else{
            // stay on page and show errors.
        }
        console.log(data); //send data
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
                type:'username',
                id:'username',
                variant:'filled',
                margin: 'normal'
            }
    }

    const theme = createTheme()
    return (
        <>
        
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
                            
                                <TextField {...props.email}></TextField>
                                <TextField {...props.password}></TextField>
                                <TextField {...props.username}></TextField>
                                <FormControl fullWidth variant='filled'>
                                    <InputLabel id="role-label">Role</InputLabel> 
                                    <Select labelId='role-label'>
                                    <MenuItem value={'Artist'}>Artist</MenuItem>
                                    <MenuItem value={'Listener'}>Listener</MenuItem>
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