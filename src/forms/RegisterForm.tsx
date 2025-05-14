import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Grid,
    InputAdornment,
    IconButton,
    Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from '../contexts/UserContext';
import { useErrorHandler } from '../contexts/ErrorContext';
import { Roles } from '../types/Roles';
import IGNButton from '../components/common/IGNButton';
import { useNavigate } from 'react-router-dom';

interface FormData {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    fullname?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const RegisterForm: React.FC = () => {
    const { registerUser, loading } = useUser();
    const { updateError } = useErrorHandler();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        // Full name validation
        if (!formData.fullname) {
            newErrors.fullname = 'Full name is required';
            isValid = false;
        } else if (formData.fullname.length < 2) {
            newErrors.fullname = 'Name must be at least 2 characters';
            isValid = false;
        }

        // Username validation
        if (!formData.username) {
            newErrors.username = 'Username is required';
            isValid = false;
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
            isValid = false;
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
            isValid = false;
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                setFormError(null);
                const { confirmPassword, ...registrationData } = formData;
                const response = await registerUser({
                    data: {
                        ...registrationData,
                        role: Roles.MENTEE,
                    },
                });
            
                if (response) {
                    navigate('/dashboard/mentee');
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred during registration';
                setFormError(errorMessage);
                updateError?.(errorMessage);
            }
        }
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: 'transparent',
            }}
        >
            {formError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {formError}
                </Alert>
            )}

            <Grid container spacing={2}>
                <Grid item   sm={12}>
                    <TextField
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                        fullWidth
                        label="Fullname"
                        error={!!errors.fullname}
                        helperText={errors.fullname}
                        autoFocus
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item  sm={12}>
                    <TextField
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        fullWidth
                        label="Username"
                        error={!!errors.username}
                        helperText={errors.username}
                        variant="outlined"
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        error={!!errors.password}
                        helperText={errors.password}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        fullWidth
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            </Grid>

            <IGNButton
                type="submit"
                loading={loading}
            >
                Register
            </IGNButton>

            <Typography variant="body2" color="text.secondary" align="center">
                By registering, you agree to our Terms of Service and Privacy Policy
            </Typography>
        </Paper>
    );
};

export default RegisterForm; 