import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Grid,
  Snackbar,
  Alert as MuiAlert
} from '@mui/material';
import { useUser } from '../contexts/UserContext';
import { APP_ENDPOINTS, Endpoints } from '../config/app';

const Alert = React.forwardRef(function Alert(props: any, ref: React.Ref<any>) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaymentForm = ({ amount, productId, mentorId, onSuccess }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    setFormData(prev => ({ ...prev, name: user?.fullname || '' }));
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    const { name, address, city, state, zip } = formData;
    if (!name || !address || !city || !state || !zip) {
      showSnackbar("Please complete all billing fields.", "error");
      setLoading(false);
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    
    if(!cardElement){
      throw new Error('Card element did not load.')
    }

    try {
      const paymentIntentResponse = await fetch(`${APP_ENDPOINTS.PAYMENT.CREATE_INTENT}`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({amount})
      })

      if(!paymentIntentResponse.ok){
         throw new Error('issue with creating the payment intent')
 
      }
      
      const { client_secret } = await paymentIntentResponse.json();
      const result =  await stripe.confirmCardPayment(client_secret,{
        payment_method:{
          card: cardElement,
          billing_details:{
            name,
            address: {
              line1: address,
              city,
              state,
              postal_code: zip
            }
          }
        }
      })

      if(result.error){
        throw new Error("An unexpected error occurred. Please try again." );
      }
       onSuccess?.();
       showSnackbar("Payment successful! Your session has been booked.", "success");

      
    } catch (err: any) {
      showSnackbar("An unexpected error occurred. Please try again.", "error");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom align="center">Secure Payment</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="ZIP"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': { color: '#aab7c4' }
                  },
                  invalid: { color: '#c23d4b' }
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            disabled={!stripe || loading}
            onClick={handlePayment}
          >
            {loading ? <CircularProgress size={20} /> : `Pay $${(amount / 100).toFixed(2)}`}
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentForm;
