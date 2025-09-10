import React, { useEffect, useMemo, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Grid,
  Snackbar,
  Alert as MuiAlert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemText,
  Paper
} from '@mui/material';
import { useUser } from '../contexts/UserContext';
import { APP_ENDPOINTS } from '../config/app';
import useHttp from '../customhooks/useHttp';

const Alert = React.forwardRef(function Alert(props: any, ref: React.Ref<any>) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Copy shown inside the dropdown + details panel
const TIER_COPY: Record<string, { label: string; desc: string; bullets: string[] }> = {
  basic: {
    label: 'Vibe Check',
    desc: 'Quick chemistry check or one-off advice',
    bullets: ['1× 20–30 min session', 'Ask a burning question or share goals', 'Get clear next steps']
  },
  pro: {
    label: 'Pro Track',
    desc: 'Structured plan + accountability',
    bullets: ['3× 45-min sessions (4 weeks)', 'Personalized action plan', 'Review of 1 asset']
  },
  platinum: {
    label: 'Platinum 6-Session',
    desc: 'Deep mentorship + portfolio polish',
    bullets: ['6× 45-min sessions (12 weeks)', 'Career roadmap + milestones', 'Priority scheduling']
  }
};

interface StripePrice {
  id: string;
  unit_amount: number | null;
  currency: string;
  active: boolean;
  nickname?: string | null; // 'basic' | 'pro' | 'platinum'
}

export default function PaymentForm({ amount: amountProp, productId, mentorId, onSuccess }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const { user, accessToken } = useUser();
  const { get } = useHttp();

  const [loading, setLoading] = useState(false);
  const [loadingPrices, setLoadingPrices] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [productPrices, setProductPrices] = useState<Array<{ id: string; name: string; amount: number | null }>>([]);
  const [selectedPriceId, setSelectedPriceId] = useState<string>('');

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

  // Load Stripe Prices for this mentor's product
  useEffect(() => {
    (async () => {
      try {
        setLoadingPrices(true);
        setError(null);
        setSuccess(null);

        const product_id = user?.mentor?.product?.stripe_product_id || null;
        if (!product_id) {
          setError('No Stripe product found for your account. Please contact support.');
          setProductPrices([]);
          setSelectedPriceId('');
          return;
        }

        // NOTE: keeping your original key name "PRICES_BY_PROUDCT" as-is
        const url = APP_ENDPOINTS.PRODUCTS.PRICES_BY_PROUDCT.replace(':product_id', product_id);
        const response = await get(url);
        const prices: StripePrice[] = response?.data?.data || response?.data || [];

        const priceList = prices
          .filter((p) => p.active && p.unit_amount)
          .map((p) => ({ id: p.id, name: (p.nickname || '').toLowerCase(), amount: p.unit_amount }));

        setProductPrices(priceList);

        // Preselect "pro" if available, otherwise first
        const pro = priceList.find((p) => p.name === 'pro');
        setSelectedPriceId((pro || priceList[0])?.id || '');
      } catch (_err) {
        setError('Failed to load pricing.');
        setProductPrices([]);
        setSelectedPriceId('');
      } finally {
        setLoadingPrices(false);
      }
    })();
  }, [user?.id, get, productId]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, name: user?.fullname || '' }));
  }, [user]);

  const selectedPrice = useMemo(
    () => productPrices.find((p) => p.id === selectedPriceId),
    [productPrices, selectedPriceId]
  );

  const selectedNickname = (selectedPrice?.name || 'pro') as keyof typeof TIER_COPY;
  const selectedCopy = TIER_COPY[selectedNickname] || TIER_COPY['pro'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    const { name, address, city, state, zip } = formData;
    if (!name || !address || !city || !state || !zip) {
      showSnackbar('Please complete all billing fields.', 'error');
      setLoading(false);
      return;
    }

    const amount = selectedPrice?.amount ?? amountProp; // cents
    if (!amount) {
      showSnackbar('Please select a tier.', 'error');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      showSnackbar('Payment form not ready. Please try again.', 'error');
      setLoading(false);
      return;
    }

    try {
      const paymentIntentResponse = await fetch(`${APP_ENDPOINTS.PAYMENT.CREATE_INTENT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          data: {
            amount,
            mentorId: mentorId || user?.mentor?.id,
            productName: user?.mentor?.product?.name,
            productId: user?.mentor?.product?.id || productId,
            stripeProductId:
              user?.mentor?.product?.stripe_product_id || user?.mentor?.products?.stripe_product_id,
            menteeId: user?.id,
            priceId: selectedPriceId
          }
        })
      });

      if (!paymentIntentResponse.ok) throw new Error('Issue with creating the payment intent');

      const { client_secret } = await paymentIntentResponse.json();
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            address: { line1: address, city, state, postal_code: zip }
          }
        }
      });

      if ((result as any).error) throw new Error('An unexpected error occurred. Please try again.');

      onSuccess?.();
      showSnackbar('Payment successful! Your session has been booked.', 'success');
    } catch (err: any) {
      showSnackbar('An unexpected error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom align="center">
        Secure Payment
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleInputChange} />
        </Grid>

        {/* ▼ Tier dropdown */}
        <Grid item xs={12}>
          <FormControl fullWidth disabled={loadingPrices || !productPrices.length}>
            <InputLabel id="tier-label">Mentorship Tier</InputLabel>
            <Select
              labelId="tier-label"
              label="Mentorship Tier"
              value={selectedPriceId}
              onChange={(e) => setSelectedPriceId(e.target.value as string)}
              renderValue={(value) => {
                if (loadingPrices) return 'Loading prices…';
                const p = productPrices.find((x) => x.id === value);
                if (!p) return productPrices.length ? 'Select a tier' : 'No tiers available';
                const copy = TIER_COPY[(p.name as keyof typeof TIER_COPY) || 'pro'];
                return `${copy.label} — $${((p.amount || 0) / 100).toFixed(2)}`;
              }}
            >
              {productPrices.map((p) => {
                const copy = TIER_COPY[(p.name as keyof typeof TIER_COPY) || 'pro'];
                return (
                  <MenuItem key={p.id} value={p.id}>
                    <ListItemText
                      primary={`${copy.label} • $${((p.amount || 0) / 100).toFixed(2)}`}
                      secondary={copy.desc}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {loadingPrices && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {!loadingPrices && !productPrices.length && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              No active pricing tiers found. Please contact support.
            </Typography>
          )}
        </Grid>

        {/* Helper panel explaining the selected tier */}
        {!loadingPrices && selectedPrice && (
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {selectedCopy.label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {selectedCopy.desc}
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {selectedCopy.bullets.map((b) => (
                  <li key={b}>
                    <Typography variant="body2">{b}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="ZIP" name="zip" value={formData.zip} onChange={handleInputChange} />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
            <CardElement
              options={{
                style: {
                  base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
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
            disabled={!stripe || loading || loadingPrices || !selectedPriceId}
            onClick={handlePayment}
          >
            {loading || loadingPrices ? (
              <CircularProgress size={20} />
            ) : (
              `Pay $${(((selectedPrice?.amount ?? amountProp) || 0) / 100).toFixed(2)}`
            )}
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
