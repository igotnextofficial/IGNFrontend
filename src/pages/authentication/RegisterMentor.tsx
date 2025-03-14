import React, { useEffect } from 'react';
import { httpDataObject, HttpMethods } from '../../types/DataTypes';
import { Avatar,Box,CssBaseline,Grid,Paper,Typography,Link} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '../../components/Copyright';
import IGNButton from '../../components/Button';

import { useUser } from '../../contexts/UserContext';
import { useErrorHandler } from '../../contexts/ErrorContext';

import { useNavigate } from 'react-router-dom';

import { sendRequest } from '../../utils/helpers';

import IgnFormGenerate from '../../components/IgnFormGenerate';
import { RegisterMentorFormStructure } from '../../formstructures/RegisterMentorFormStructure';
import FormDataProvider from '../../providers/FormDataProvider';

import User from '../../models/users/User';
import { useFormDataContext } from '../../contexts/FormContext';
import useFetch from '../../customhooks/useFetch';
import { APP_ENDPOINTS } from '../../config/app';
import { data } from '../../fake-data';


function formatNumber(num:string) {
    return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

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
    const [response, setResponse] = React.useState<any>({});
    const {updateError} = useErrorHandler()
    const [refreshPage, setRefreshPage] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [price, setPrice] = React.useState<number>(0);
    const navigate = useNavigate();
    const { setSendRequest,setSendData,fetchData} = useFetch({ 
        method:HttpMethods.POST} );



        // useEffect(() => {
        //     if (user && user.role && user.role.type !== "admin") {
        //         navigate(`/`, { replace: true });
        //       }
        // },[user,navigate])

    useEffect(() => {
        if(success){
          
            const createProduct = async (response:Record<string,any>) => {
          
                const data:Record<string,any> = {
                    id: response.data.id,
                    name: `mentorship:${response.data.username}`,
                    desctiption: `IGN Mentor: ${response.data.username}`,
                    default_price_data: {
                        currency: 'usd',
                        unit_amount: price +'00',
                        recurring: {interval: 'month'}
                    },
                    "unit_amount": price + '00',
                }
                const successful_response = await fetchData(APP_ENDPOINTS.PRODUCTS.BASE,HttpMethods.POST,{'content-type':'application/json'},{data});
          
                return successful_response
            }

            let data = createProduct(response).then((data) => {
          
            }).catch((error) => {
                //  log the error 
            })
            
          
        }
    },[success ])
 

    const handleSubmit = async (event:  React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
 
        if(isValid){
            data['role'] = "mentor";  
            
           const data_response = await RegisterUserAttempt({data});
           if (data_response) {
 
            setPrice(data['price'])
            setResponse(data_response);
            setSuccess(true);
            if (data_response.errors?.length) {
                updateError?.(data_response.errors.join(' '));
            } else {
                
            }
        } else {
          
            updateError?.("Issues with registering user");
        }
       
         
        }

    }

  

    const theme = createTheme()
    return (
 
        <>
          
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
                                Register Mentor
                            </Typography>
                            <Box component="div" sx={{ mt: 1 }} >
                            
                            <IgnFormGenerate formStructures={RegisterMentorFormStructure} />
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
        <FormDataProvider validations={user.validateMentorRegistrationForm()} formKeys={user.validationMentorIntialStates()}>
            <RegisterDisplay/>
        </FormDataProvider>
    )
}
export default Register