import React,{useEffect, useState} from 'react';
import useHttp from '../../customhooks/useHttp';
import { useSearchParams,useParams } from 'react-router-dom'
import { APP_ENDPOINTS } from '../../config/app';
import { useUser } from '../../contexts/UserContext';
import { Box,Paper,Alert,CircularProgress,Button, Typography } from '@mui/material';
import IGNButton from '../common/IGNButton';

 
const EmailVerification = () => {
    const [loading,setLoading] = useState(false);
    const [url,setUrl] = useState<string>('');
    const [errorMessage,setErrorMessage] = useState<string>('');
    const [hasError,setHasError] = useState(false);
    const [success,setSuccess] = useState(false);
    const [resend,setResend] = useState(false);
    const { user } = useUser();
    const { get ,post,error} = useHttp();
    const [searchParams] = useSearchParams();
    
    const { id,hash } = useParams<{ id: string, hash:string }>();
    const expires = searchParams.get('expires');
    const signature = searchParams.get('signature');
    
    useEffect(() => {
        let uri = [id,hash].join('/');
        let queryString = `expires=${expires}&signature=${signature}`;
        let url = `${APP_ENDPOINTS.USER.BASE.replace('users','')}email/verify/${uri}?${queryString}`;
        setUrl(url);
    }, [id, hash, expires, signature]);

    const handleVerification = async () => {
        setLoading(true);
        try {
            // Call your API to verify the email with the token
            const response = await get(url);
            if (!response.status || response.status !== 200) {
                throw new Error('Email verification failed');
            }
            const data =  response.data; 
            setSuccess(true);
            console.log('Email verified successfully:', data);
        } catch (error) {
            console.error('Error verifying email:', error);
            setErrorMessage('Email verification failed. Please try again.');
            setHasError(true);
            setResend(true);
        } finally {
            setLoading(false);
        }
    }

    const handleResubmission = async () => {
        try{
            const response = await post(APP_ENDPOINTS.USER.EMAIL_VERIFICATION.RESEND, {
                user_id:id,
            });

            if (response.status === 200) {
                setSuccess(true);
                setErrorMessage('Verification email resent successfully.');
                setHasError(false);
            } else {
                setErrorMessage('Failed to resend verification email. Please try again later.');
                setHasError(true);
            }
        }
        catch (error) {
            console.error('Error resending verification email:', error);
            setErrorMessage('Failed to resend verification email. Please try again later.');
            setHasError(true);
        }
        // Logic to handle resubmission of verification email

        
        // You can implement the logic to resend the verification email here
    };

    return <>
    {
     
            <Box sx={{ width: '100%', marginTop: 2 }}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', maxWidth: 400, margin: 'auto' }}>
                    <h2>Email Verification</h2>
                    <p>Please click the button below to verify your email address.</p>
                    {loading && <CircularProgress color={'error'} size={24} sx={{ marginBottom: 2 }} />}
                    <IGNButton onClick={handleVerification} disabled={loading || resend}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </IGNButton>
                    {hasError && <Alert severity="error" sx={{ marginTop: 2 }}>
                        {errorMessage} 
                        <Button onClick={handleResubmission} variant='text'>click here for a new verification link.</Button>
                       
                    </Alert>}
                    {success && <Alert severity="success" sx={{ marginTop: 2 }}>
                        Your account has been successfully verified.
                    </Alert>}
                    {resend && <Alert severity="info" sx={{ marginTop: 2 }}>
                        If you did not receive the verification email, please check your spam folder or click the button below to resend it.
                    
                    </Alert>}
                </Paper>
            </Box>
        
    }
      
    </>
}

export default EmailVerification;