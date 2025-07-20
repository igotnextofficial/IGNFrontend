import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Typography,
    Alert,
    Grid,
    InputAdornment,
    IconButton,
    Paper,
    FormControlLabel,
    Checkbox,
    Link,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from '../contexts/UserContext';
import { useErrorHandler } from '../contexts/ErrorContext';
import { Roles } from '../types/Roles';
import IGNButton from '../components/common/IGNButton';
import { useNavigate, Link as RouterLink ,useSearchParams} from 'react-router-dom';
import useHttp from '../customhooks/useHttp';
import { APP_ENDPOINTS } from '../config/app';


interface FormData {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    price: string;
    agreeToTerms: boolean;
}

interface FormErrors {
    fullname?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    price?: string;
    agreeToTerms?: string;
}

const RegisterMentorForm: React.FC<{ token: string }> = ({ token }) => {
    const { loading } = useUser();
    const { updateError } = useErrorHandler();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        price: '',
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isDisabled, setIsDisabled] = useState(false);
    const [showRedirectOverlay, setShowRedirectOverlay] = useState(false);
    const navigate = useNavigate();
    const { post } = useHttp();
    useEffect(() => {
        console.log(`endpoint ${APP_ENDPOINTS.USER.CREATE_MENTOR}`);
    }, []);
    // Redirect after success with overlay
    useEffect(() => {
        let successTimeout: NodeJS.Timeout | null = null;

        if (formSuccess) {
            setShowRedirectOverlay(true);
            successTimeout = setTimeout(() => {
                navigate('/login'); // Redirect after 3 seconds
            }, 3000);
        }

        return () => {
            if (successTimeout) clearTimeout(successTimeout);
        };
    }, [formSuccess, navigate]);

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
            newErrors.password =
                'Password must contain at least one uppercase, one lowercase, one number, and one special character';
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

        // Price validation with minimum check
        if (!formData.price) {
            newErrors.price = 'Price is required';
            isValid = false;
        } else if (isNaN(Number(formData.price))) {
            newErrors.price = 'Please enter a valid number';
            isValid = false;
        } else if (Number(formData.price) < 200) {
            newErrors.price = 'Minimum price is $200';
            isValid = false;
        }

        // Terms agreement
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms =
                'You must agree to the Terms of Service, Privacy Policy, and Community Guidelines to continue';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                setFormError(null);
                setFormSuccess(null);
                const { confirmPassword, ...registrationData } = formData;

                const response = await post( APP_ENDPOINTS.USER.CREATE_MENTOR, {
                    data: {
                        ...registrationData,
                        role: Roles.MENTOR,
                        price: Math.round(Number(registrationData.price) * 100),
                        token,
             
                    },
                    autoLogin: false,
                });

                if (response.status !== 201) {
                    throw new Error('Registration failed. Please try again.');
                }

                setFormSuccess('Registration successful! Being redirected to login...');
                setIsDisabled(true);
                
            } catch (error) {
                const errorMessage = 'Registration failed. Please try again with the same email address the link was sent to. Need help? Email us at support@igotnextmagazine.com.';

                setFormError(errorMessage);
                updateError?.(errorMessage);
            }
        }
    };

    return (
        <>
            <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={0}
                sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: 'transparent' }}
            >
                {formError && <Alert severity="error">{formError}</Alert>}
                {formSuccess && <Alert severity="success">{formSuccess}</Alert>}

                <Grid container spacing={2}>
                    {/* Full Name */}
                    <Grid item xs={12}>
                        <TextField
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                            fullWidth
                            disabled={isDisabled}
                            label="Full Name"
                            placeholder="e.g., John Doe"
                            error={!!errors.fullname}
                            helperText={errors.fullname || "Letters, spaces, apostrophes, and hyphens only"}
                        />
                    </Grid>

                    {/* Username */}
                    <Grid item xs={12}>
                        <TextField
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            fullWidth
                            disabled={isDisabled}
                            label="Username"
                            placeholder="e.g., john_doe"
                            error={!!errors.username}
                            helperText={errors.username || "Only letters, numbers, and underscores"}
                        />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                            disabled={isDisabled}
                            label="Email Address"
                            placeholder="e.g., john@example.com"
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email || "Enter a valid email address"}
                        />
                    </Grid>

                    {/* Password */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            fullWidth
                            disabled={isDisabled}
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter a strong password"
                            error={!!errors.password}
                            helperText={errors.password || "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            disabled={isDisabled}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Confirm Password */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            fullWidth
                            disabled={isDisabled}
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Re-enter password"
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                            disabled={isDisabled}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Price per Session */}
                    <Grid item xs={12}>
                        <TextField
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            fullWidth
                            disabled={isDisabled}
                            label="Price per session"
                            placeholder="e.g., 200"
                            type="number"
                            error={!!errors.price}
                            helperText={errors.price || "Minimum $200 (e.g., 200 for $200.00)"}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ color: 'text.disabled' }}>.00</InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Terms Agreement */}
                <Box sx={{ mt: 2 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                color="primary"
                                disabled={isDisabled}
                            />
                        }
                        label={
                            <Typography variant="body2">
                                I agree to the{' '}
                                <Link component={RouterLink} to="/terms-of-service" target="_blank" color="primary">
                                    Terms of Service
                                </Link>
                                {', '}
                                <Link component={RouterLink} to="/privacy-policy" target="_blank" color="primary">
                                    Privacy Policy
                                </Link>
                                {' and '}
                                <Link component={RouterLink} to="/community-guidelines" target="_blank" color="primary">
                                    Community Guidelines
                                </Link>
                            </Typography>
                        }
                    />
                    {errors.agreeToTerms && (
                        <Typography variant="caption" color="error" sx={{ ml: 4, display: 'block' }}>
                            {errors.agreeToTerms}
                        </Typography>
                    )}
                </Box>

                <IGNButton type="submit" loading={loading} disabled={isDisabled || loading}>
                    Register as Mentor
                </IGNButton>
            </Paper>

            {/* Overlay Spinner */}
            {showRedirectOverlay && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(0,0,0,0.6)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        color: '#fff',
                    }}
                >
                    <Box
                        sx={{
                            border: '6px solid rgba(255,255,255,0.3)',
                            borderTop: '6px solid #fff',
                            borderRadius: '50%',
                            width: 50,
                            height: 50,
                            animation: 'spin 1s linear infinite',
                            '@keyframes spin': {
                                '0%': { transform: 'rotate(0deg)' },
                                '100%': { transform: 'rotate(360deg)' },
                            },
                        }}
                    />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Redirecting to login...
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default RegisterMentorForm;
