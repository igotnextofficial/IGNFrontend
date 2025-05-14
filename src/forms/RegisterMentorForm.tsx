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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from '../contexts/UserContext';
import { useErrorHandler } from '../contexts/ErrorContext';
import { Roles } from '../types/Roles';
import IGNButton from '../components/common/IGNButton';
import { useNavigate } from 'react-router-dom';
import useHttp from '../customhooks/useHttp';
import { APP_ENDPOINTS } from '../config/app';
import { HttpMethods } from '../types/DataTypes';

interface FormData {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    price: string;
}

interface FormErrors {
    fullname?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    price?: string;
}

const RegisterMentorForm: React.FC = () => {
    const { registerUser, loading } = useUser();
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
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState<any>({});
    const navigate = useNavigate();
    const { post } = useHttp();

    useEffect(() => {
        if (success) {
            const createProduct = async (response: Record<string, any>) => {
                const priceInCents = Math.round(Number(formData.price) * 100);
                const data: Record<string, any> = {
                    id: response.data.id,
                    name: `mentorship:${response.data.id}`,
                    email: response.data.email,
                    description: `IGN Mentor: ${response.data.username}`,
                    default_price_data: {
                        currency: 'usd',
                        unit_amount: priceInCents,
                        recurring: { interval: 'month' }
                    },
                    "unit_amount": priceInCents,
                };
                const successful_response = await post(
                    APP_ENDPOINTS.PRODUCTS.BASE,
                    { data } 
                );
                return successful_response;
            };

            createProduct(response)
                .then((data) => {
                    console.log(`Product created: ${JSON.stringify(data, null, 2)}`);
                })
                .catch((error) => {
                    console.log(`Error creating product: ${JSON.stringify(error, null, 2)}`);
                    updateError?.('Error creating product. Please try again.');
                });
        }
    }, [success, response, formData.price, post, updateError]);

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

        // Price validation
        if (!formData.price) {
            newErrors.price = 'Price is required';
            isValid = false;
        } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = 'Please enter a valid price';
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
                setFormSuccess(null);
                const { confirmPassword, ...registrationData } = formData;
                const response = await post(process.env.REACT_APP_REGISTER_API || "", {
                    data: {
                        ...registrationData,
                        role: Roles.MENTOR,
                        price: Math.round(Number(registrationData.price) * 100)
                    },
                    autoLogin: false
                });
            
                if (response.data?.user) {
                    // Get the user data from the registration response
                    const userData = response.data.user;
                    // Create product after successful registration
                    const priceInCents = Math.round(Number(formData.price) * 100);
                    const productData = {
                        id: userData.id,
                        name: `mentorship:${userData.id}`,
                        email: userData.email,
                        price: priceInCents,
                        description: `IGN Mentor: ${userData.username}`,
                        default_price_data: {
                            currency: 'usd',
                            unit_amount: priceInCents,
                            recurring: { interval: 'month' }
                        },
                        "unit_amount": priceInCents,
                    };

                    try {
                        const productResponse = await post(
                            APP_ENDPOINTS.PRODUCTS.BASE,
                            { data: productData }
                        );
                        console.log(`Product created: ${JSON.stringify(productResponse, null, 2)}`);
                        setFormSuccess('Registration successful!');
                    } catch (error) {
                        console.log(`Error creating product: ${JSON.stringify(error, null, 2)}`);
                        updateError?.('Error creating product. Please try again.');
                    }
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
            {formSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {formSuccess}
                </Alert>
            )}

            <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <TextField
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        fullWidth
                        label="Session Price"
                        type="number"
                        error={!!errors.price}
                        helperText={errors.price}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                Register as Mentor
            </IGNButton>

            <Typography variant="body2" color="text.secondary" align="center">
                By registering, you agree to our Terms of Service and Privacy Policy
            </Typography>
        </Paper>
    );
};

export default RegisterMentorForm; 