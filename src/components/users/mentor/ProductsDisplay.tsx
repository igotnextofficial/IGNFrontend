import React, { useEffect, useState } from 'react'
import { UserDataType, ProductDataType } from "../../../types/DataTypes";
import { Grid, Box,Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import useHttp from '../../../customhooks/useHttp';
import { APP_ENDPOINTS } from '../../../config/app';
import { centsToDollars } from '../../../utils/helpers';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProductDisplay({ user, displayButton }: { user: UserDataType, displayButton: boolean }) {
  const [products, setProducts] = useState<ProductDataType[]>([]);
  const [tiers, setTiers] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { get } = useHttp();

const descriptions: Record<'basic' | 'pro' | 'platinum', string> = {
  basic: 'Single 60-min 1:1 session focused on your top questions with a clear next-step plan.',
  pro: 'Three 60-min sessions to build momentum: goal setting, targeted feedback, and homework between calls.',
  platinum: 'Six 60-min sessions for full mentorship: customized roadmap, portfolio/audition prep, and priority scheduling.'
};

  type DescriptionKey = keyof typeof descriptions;

  useEffect(() => {
    if (!user?.product) return;

    (async () => {
      setIsLoading(true);
      try {
        const product_id = user.product.stripe_product_id;
        const url = APP_ENDPOINTS.PRODUCTS.PRICES_BY_PROUDCT.replace(':product_id', product_id);

        const results = await get(url);
        const response = results.data['data']
       
        const productTiers =  response.map((tier: Record<string, any>) => ({
          price: centsToDollars(tier.unit_amount),
          name: tier.nickname,
          desc: descriptions[tier.nickname as DescriptionKey],
        }));

        setTiers(productTiers);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user?.product]);

 

return (
  <>
    {isLoading ? (
      <div className="flex justify-center items-center py-6">
        <CircularProgress />
      </div>
    ) : (
      <>
        {tiers.length === 0 ? (
          <p className="muted">No current products</p>
        ) : (
         <Grid container spacing={3}>
  {tiers
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ''));
      const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ''));
      return priceA - priceB;
    })
    .map((tier: Record<string, any>) => (
      <Grid item xs={12} sm={6} md={4} key={tier.name}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, minWidth: 0 }}>
            {/* Ensure children can ellipsize inside CardContent */}
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h6"
                noWrap
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis',textTransform:'capitalize' }}
              >
                {tier.name}
              </Typography>
            </Box>

            {/* Price: don’t allow shrinking; responsive size that adapts to any container */}
            <Typography
              sx={{
                fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                fontWeight: 700,
                whiteSpace: 'nowrap',
           
                flexShrink: 0,
              }}
              color="#1d1917"
            >
              {tier.price}
            </Typography>

            {/* Description: wrap long words gracefully */}
            <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
              {tier.desc}
            </Typography>
          </CardContent>

          {displayButton && (
            <CardActions sx={{ mt: 'auto', p: 2, pt: 0 }}>
              <Link to={`/mentors/book-a-mentor/${user.id}`} style={{ width: '100%' }}>
                <Button variant="contained" color="primary" fullWidth>
                  Select
                </Button>
              </Link>
            </CardActions>
          )}
        </Card>
      </Grid>
    ))}
</Grid>
        )}
      </>
    )}
  </>
);
}
