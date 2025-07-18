import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  Avatar,
  Grid,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from '../../contexts/UserContext';
import useHttp from '../../customhooks/useHttp';
import { APP_ENDPOINTS } from '../../config/app';
import { useErrorHandler } from '../../contexts/ErrorContext';
import { Navigate } from 'react-router-dom';
import LoadingComponent from '../../components/common/LoadingComponent';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const { user, isLoggedin } = useUser();
  const { accessToken } = useUser();
  const { put } = useHttp(accessToken);
  const { updateError } = useErrorHandler();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<ChangePasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<ChangePasswordFormData>>({});
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  // Redirect if not logged in
  if (!isLoggedin || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ChangePasswordFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTogglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ChangePasswordFormData> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const response = await put(APP_ENDPOINTS.USER.CHANGE_PASSWORD, {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        id: user.id
      });

      if (response) {
        setSuccess(true);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setErrors({});
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrors({
          currentPassword: 'Current password is incorrect'
        });
      } else {
        updateError(error.message || 'Failed to change password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          background: '#fff'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
            <LockOutlined sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 600, color: '#1d1917' }}>
            Change Password
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#666', textAlign: 'center' }}>
            Update your password to keep your account secure
          </Typography>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Password changed successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="currentPassword"
                label="Current Password"
                type={showPasswords.currentPassword ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.currentPassword}
                helperText={errors.currentPassword}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleTogglePasswordVisibility('currentPassword')}
                        edge="end"
                        sx={{ color: '#666' }}
                      >
                        {showPasswords.currentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="newPassword"
                label="New Password"
                type={showPasswords.newPassword ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleTogglePasswordVisibility('newPassword')}
                        edge="end"
                        sx={{ color: '#666' }}
                      >
                        {showPasswords.newPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                label="Confirm New Password"
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleTogglePasswordVisibility('confirmPassword')}
                        edge="end"
                        sx={{ color: '#666' }}
                      >
                        {showPasswords.confirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: '#1d1917',
                  color: '#FBFAF9',
                  '&:hover': {
                    backgroundColor: '#2d2927',
                  },
                  '&:disabled': {
                    backgroundColor: '#ccc',
                  },
                }}
              >
                {loading ? 'Changing Password...' : 'Change Password'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        <Box
  sx={{
    backgroundColor: '#f9f9f9',  // Light gray background
    border: '1px solid #ddd',    // Subtle border
    borderRadius: 2,
    p: 2,
    mt: 3,
    textAlign: 'left',
  }}
>
  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
    Password Requirements:
  </Typography>
  <Typography variant="body2" sx={{ color: '#555' }}>
    • At least 8 characters<br />
    • Include one uppercase letter<br />
    • Include one lowercase letter<br />
    • Include one number<br />
    • Include one special character (@$!%*?&)
  </Typography>
</Box>
      </Paper>
    </Container>
  );
};

export default ChangePassword; 