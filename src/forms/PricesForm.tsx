import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import IGNButton from '../components/common/IGNButton';
import useHttp from '../customhooks/useHttp';
import { useUser } from '../contexts/UserContext';
import { APP_ENDPOINTS } from '../config/app';
import {
  toNumber,
  toCents,
  roundDollars,
  DISCOUNT_PRO,
  DISCOUNT_PLATINUM,
  SESSIONS,
  BASIC_OPTIONS,
  BASIC_LIMITS,
} from '../utils/helpers';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';


type TierName = 'basic' | 'pro' | 'platinum';

interface StripePrice {
  id: string;
  unit_amount: number | null;
  unit_amount_decimal?: string | null;
  currency: string;
  active: boolean;
  nickname?: string | null; // 'basic' | 'pro' | 'platinum'
  metadata?: Record<string, any>;
}

const MAX_TIER_AMOUNT = 3;
const TIER_NAMES: TierName[] = ['basic', 'platinum', 'pro']; // keep your original order

// helpers
const centsToWholeDollars = (c?: number | null) =>
  typeof c === 'number' && Number.isFinite(c) ? String(Math.round(c / 100)) : '';

const getTierName = (p: StripePrice): TierName | null => {
  const n = (p.nickname || p.metadata?.tier || '').toString().toLowerCase();
  return (TIER_NAMES as string[]).includes(n) ? (n as TierName) : null;
};

const pickAmount = (p: StripePrice): number | null => {
  if (typeof p.unit_amount === 'number') return p.unit_amount;
  if (p.unit_amount_decimal) {
    const n = Number(p.unit_amount_decimal);
    return Number.isFinite(n) ? Math.round(n) : null;
  }
  return null;
};

const PricesForm: React.FC = () => {
  const { get, put, post } = useHttp();
  const { user, loadingUser,loading } = useUser();

  const [tiers, setTiers] = useState<StripePrice[]>([]);
  const [needMoreTiers, setNeedMoreTiers] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // editable state
  const [priceBasic, setPriceBasic] = useState<string>(''); // whole dollars as string
  const [defaultTier, setDefaultTier] = useState<TierName>('basic');
  const [oldPrices,setOldPrices] = useState<string[]>([])

  const product_id = user?.product?.stripe_product_id as string | undefined;

  // load existing prices
  useEffect(() => {
    if (!loadingUser && !user) return;
    
    (async () => {
      try {
        setError(null);
        setSuccess(null);

       
        if (!product_id) {
          setError('No Stripe product found for your account. Please contact support.');
          return;
        }

        const url = APP_ENDPOINTS.PRODUCTS.PRICES_BY_PROUDCT.replace(':product_id', product_id);
        const response = await get(url);

        const prices: StripePrice[] = response?.data?.data || response?.data || [];
        const price_ids = prices.map( (price) => {return price.id});
        setOldPrices(price_ids)
        const filtered = prices.filter((p: StripePrice) => {
          const name = (p.nickname || p.metadata?.tier || '').toString().toLowerCase();
          return TIER_NAMES.includes(name as TierName);
        });

        setTiers(filtered);

        // Prefill Basic if present
        const existingBasic = filtered.find(
          (p) => (p.nickname || p.metadata?.tier || '').toString().toLowerCase() === 'basic'
        );
        const basicCents = pickAmount(existingBasic as StripePrice);
        const basicDollars = centsToWholeDollars(basicCents);
        if (basicDollars) setPriceBasic(basicDollars);
      } catch (_err) {
        // swallow or set a generic error
        setError('Failed to load pricing.');
      }
    })();
  }, [user?.id, product_id, get]);

  // track if we need to create or update
  useEffect(() => {
    setNeedMoreTiers(tiers.length < MAX_TIER_AMOUNT);
  }, [tiers]);

  // derived prices (whole dollars as string)
  const basicNum = useMemo(() => toNumber(priceBasic), [priceBasic]);
  const pricePro = useMemo(() => {
    if (Number.isNaN(basicNum) || basicNum <= 0) return '';
    return String(roundDollars(basicNum * SESSIONS.pro * (1 - DISCOUNT_PRO)));
  }, [basicNum]);
  const pricePlatinum = useMemo(() => {
    if (Number.isNaN(basicNum) || basicNum <= 0) return '';
    return String(roundDollars(basicNum * SESSIONS.platinum * (1 - DISCOUNT_PLATINUM)));
  }, [basicNum]);

  const perSessionHint = (totalStr: string, sessions: number) => {
    const n = toNumber(totalStr);
    if (Number.isNaN(n) || n <= 0) return '';
    return ` • ≈ $${(Math.round((n / sessions) * 100) / 100).toFixed(2)}/session`;
  };

  const existingCentsByTier: Partial<Record<TierName, number>> = useMemo(() => {
    const out: Partial<Record<TierName, number>> = {};
    for (const p of tiers) {
      const name = getTierName(p);
      const amount = pickAmount(p);
      if (name && amount) out[name] = amount;
    }
    return out;
  }, [tiers]);

  const existingVsNewHint = (tier: TierName) => {
    const existingCents = existingCentsByTier[tier];
    const proposedDollars =
      tier === 'basic' ? priceBasic : tier === 'pro' ? pricePro : pricePlatinum;
    const existingDollars = centsToWholeDollars(existingCents ?? null);
    if (existingCents && existingDollars !== proposedDollars) {
      return `Current on Stripe: $${existingDollars} • Will update to $${proposedDollars}`;
    }
    if (existingCents && existingDollars === proposedDollars) {
      return `Current on Stripe: $${existingDollars}`;
    }
    return 'No existing price found — will create it';
  };

  const validate = (): string | null => {
    if (!priceBasic) return 'Basic price is required';
    const n = toNumber(priceBasic);
    if (Number.isNaN(n)) return 'Enter a valid number for Basic';
    if (n < BASIC_LIMITS.min) return `Minimum Basic is $${BASIC_LIMITS.min}`;
    if (n > BASIC_LIMITS.max) return `Maximum Basic is $${BASIC_LIMITS.max}`;
    return null;
  };

  // create/update using your replace() endpoints
  const createPriceData = async (payload: Record<string, any>) => {
    const url = APP_ENDPOINTS.PRICE.CREATE
    return post(url, payload);
  };

  const savePriceData = async (payload: Record<string, any>) => {
    const response = await createPriceData(payload);
    return response
    // if (needMoreTiers) {
    //   return createPriceData(payload);
    // }
    // return updatePriceData(payload);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    if (!product_id) { setError('No Stripe product found for this mentor.'); return; }

    try {
      setBusy(true);
      setError(null);
      setSuccess(null);

      const payload = {
        data: {
          product_id: user?.product.id,
          stripe_product_id:product_id,
          default_tier: defaultTier,
          old_prices:oldPrices,
          tiers: [
            { name: 'basic',    price: toCents(toNumber(priceBasic)) },
            { name: 'pro',      price: toCents(toNumber(pricePro)) },
            { name: 'platinum', price: toCents(toNumber(pricePlatinum)) },
          ],
        },
      };

      const resp = await savePriceData(payload);
      if (resp?.status && resp.status >= 400) {
        throw new Error(resp?.data?.message || 'Failed to save prices');
      }

      setSuccess('Your pricing has been saved.');

      // refresh
      const url = APP_ENDPOINTS.PRODUCTS.PRICES_BY_PROUDCT.replace(':product_id', product_id);
      const refreshed = await get(url);
      const prices: StripePrice[] = refreshed?.data?.data || refreshed?.data || [];
      const filtered = prices.filter((p: StripePrice) => {
        const name = (p.nickname || p.metadata?.tier || '').toString().toLowerCase();
        return TIER_NAMES.includes(name as TierName);
      });
      setTiers(filtered);
    } catch (err: any) {
      setError(err?.message || 'Failed to save pricing. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: 'transparent' }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Alert severity="info" sx={{ mb: 2 }}>
        <strong>{needMoreTiers ? 'Create' : 'Update'} your mentorship pricing.</strong>{' '}
        Choose your <em>Basic</em> price (per 1 session). We automatically calculate bundles:
        <br />
        <code>Pro (3 sessions) = 3 × Basic × (1 − 10%)</code>{' '}and{' '}
        <code>Platinum (6 sessions) = 6 × Basic × (1 − 15%)</code>.
      </Alert>

      {!product_id && (
        <Alert severity="warning">No Stripe product found for your account. Please contact support.</Alert>
      )}

      <Grid container spacing={2}>
        {/* Basic (mentor-chosen) */}
        <Grid item xs={12} sm={4}>
          <TextField
            name="priceBasic"
            value={priceBasic}
            onChange={(e) => setPriceBasic(e.target.value)}
            required
            fullWidth
            select
            label="Basic • 1 session"
            helperText={existingVsNewHint('basic') || BASIC_LIMITS.label}
          >
            {BASIC_OPTIONS.map((v) => (
              <MenuItem key={v} value={String(v)}>${v}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Pro (derived) */}
        <Grid item xs={12} sm={4}>
          <TextField
            name="pricePro"
            value={pricePro}
            label="Pro • 3 sessions (auto)"
            fullWidth
            InputProps={{
              readOnly: true,
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              endAdornment: <InputAdornment position="end" sx={{ color: 'text.disabled' }}>.00</InputAdornment>,
            }}
            helperText={`3 × Basic − 10%${perSessionHint(pricePro, SESSIONS.pro)} — ${existingVsNewHint('pro')}`}
          />
        </Grid>

        {/* Platinum (derived) */}
        <Grid item xs={12} sm={4}>
          <TextField
            name="pricePlatinum"
            value={pricePlatinum}
            label="Platinum • 6 sessions (auto)"
            fullWidth
            InputProps={{
              readOnly: true,
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              endAdornment: <InputAdornment position="end" sx={{ color: 'text.disabled' }}>.00</InputAdornment>,
            }}
            helperText={`6 × Basic − 15%${perSessionHint(pricePlatinum, SESSIONS.platinum)} — ${existingVsNewHint('platinum')}`}
          />
        </Grid>

        {/* Default Tier Selector */}
        <Grid item xs={12}>
          <TextField
            name="defaultTier"
            value={defaultTier}
            onChange={(e) => setDefaultTier(e.target.value as TierName)}
            required
            fullWidth
            select
            label="Default tier"
            helperText="Which tier should be selected by default for your product?"
          >
            <MenuItem value="basic">Basic (1 session)</MenuItem>
            <MenuItem value="pro">Pro (3 sessions)</MenuItem>
            <MenuItem value="platinum">Platinum (6 sessions)</MenuItem>
          </TextField>
        </Grid>
      </Grid>

<Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
  <Button
    type="submit"
    disabled={busy || loading || !product_id}
    sx={{
      bgcolor: grey[900],     // black-ish
      color: '#fff',
      textTransform: 'none',
      '&:hover': { bgcolor: grey[700] },   // darker grey on hover
      '&:active': { bgcolor: grey[300], color: '#000' }, // light grey on press
    }}
  >
    {needMoreTiers ? 'Create Pricing' : 'Save Pricing'}
  </Button>

  <Button
    type="button"
    variant="outlined"
    onClick={() => window.location.reload()}
    disabled={busy}
    sx={{
      textTransform: 'none',
      borderColor: grey[900],
      color: grey[900],
      '&:hover': { borderColor: grey[700], bgcolor: grey[100] },
      '&:active': { bgcolor: grey[300] },
    }}
  >
    Cancel
  </Button>
</Box>

    </Paper>
  );
};

export default PricesForm;
