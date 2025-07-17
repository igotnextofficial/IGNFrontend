import React, {useState,useEffect} from 'react';
import { useUser } from '../../contexts/UserContext';
import { TextField, Button,Alert,Grid } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {Roles} from '../../types/Roles';
import { APP_ENDPOINTS } from '../../config/app';
import useHttp from '../../customhooks/useHttp';

const RequestMentorInvite = () => {
    const { user,loadingUser } = useUser();
    const [potentialMentorEmail, setPotentialMentorEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [hasError, setHasError] = useState(false);
    const {post} = useHttp();

    const navigate = useNavigate();
    useEffect(() => {
       if(!loadingUser){
        if (!user || user.role.type !== Roles.ADMIN) {
             navigate('/'); // Redirect to home if not an admin
        }
       }
    },[user?.id, loadingUser]);
    // if (!user || user.role.type !== 'ADMIN') {
    //     return <div>You do not have permission to access this page.</div>;
    // }
    const handleClick = async () => {
        // Logic to send an invite to the potential mentor
        // This could be an API call to your backend
        try{
            const response = await post(APP_ENDPOINTS.USER.MENTOR.INVITE, { email: potentialMentorEmail });
            if (response.status === 201) {
                setSuccess(true);
            } else {
                setHasError(true);
            }
        }
        catch(error) {
            console.error("Error sending invite:", error);
            setHasError(true);
        }

        // Optionally, you can handle the response and show a success message
        // Reset the input field after sending the invite
        setPotentialMentorEmail('');
    };
    return (
        <div>
            <h1>Request Mentor Invite</h1>
            {success && (
                <Alert severity="success">Invite sent successfully!</Alert>
            )}

            {hasError && (
                <Alert severity="error">Failed to send invite. Please try again.</Alert>
            )}

            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={8}>   
                 <TextField 
                    label="Potential Mentor's Email"
                    value={potentialMentorEmail}
                    onChange={(e) => setPotentialMentorEmail(e.target.value)}
                    fullWidth
                    />
                </Grid>
                    <Button variant ="contained" onClick={handleClick}>
                    Invite Mentor
                    </Button>
                <Grid item xs={12} sm={4}>

                </Grid>
            </Grid>
   
           

            
            {/* Add form submission logic here */}
        </div>
    );
}
const AdminDashboard = () => {
    return <>
        <h1>Welcome to the admin.</h1>
        <RequestMentorInvite/>
    </>
    
}

export default AdminDashboard