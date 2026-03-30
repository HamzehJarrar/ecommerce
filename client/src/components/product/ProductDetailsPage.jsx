import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Chip, 
  Skeleton, 
  Paper, 
  Rating,
  Divider,
  IconButton
} from '@mui/material';
import { 
  ShoppingCart, 
  FavoriteBorder, 
  Favorite,
  LocalShippingOutlined,
  VerifiedUserOutlined,
  ArrowForward
} from '@mui/icons-material';
import { apiGet } from '../../services/api';
import { ar } from '../../i18n/ar';
import { formatPrice } from '../../utils/formatCurrency';

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await apiGet(`/products/${id}`);
        if (!cancelled && data) {
          setProduct(data);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setProduct({
            _id: id,
            name: "Realme Note 60x",
            categoryLabel: "أجهزة موبايل",
            discountPercent: 100,
            originalPrice: 315,
            currentPrice: 250,
            currency: "ILS",
            image: `https://picsum.photos/seed/${id}/600/600`,
            specs: "128GB/4GB RAM",
            featured: true,
            limitedTimeOffer: true,
            rating: 4.5,
            inStock: true
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" height={500} sx={{ borderRadius: 4 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={80} />
            <Skeleton variant="text" height={40} width="60%" />
            <Skeleton variant="rectangular" height={100} sx={{ mt: 4, borderRadius: 2 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">المنتج غير موجود</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>العودة للرئيسية</Button>
      </Box>
    );
  }

  const discount = Math.round(product.discountPercent || 0);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Button 
        startIcon={<ArrowForward sx={{ transform: 'scaleX(-1)' }} />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 3, fontWeight: 700, color: 'text.secondary' }}
      >
        العودة
      </Button>

      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 5 }, 
          borderRadius: 4, 
          border: '1px solid', 
          borderColor: 'divider',
          background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
        }}
      >
        <Grid container spacing={{ xs: 3, md: 6 }}>
          
          {/* Product Image Section */}
          <Grid item xs={12} md={5}>
            <Box 
              sx={{ 
                position: 'relative', 
                bgcolor: 'white',
                borderRadius: 4,
                p: 3,
                height: { xs: 350, md: 500 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)'
              }}
            >
              <IconButton 
                onClick={() => setFav(!fav)}
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16,
                  bgcolor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  color: fav ? '#FF3366' : 'text.secondary',
                  '&:hover': { bgcolor: 'white', transform: 'scale(1.1)' }
                }}
              >
                {fav ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              
              {discount > 0 && (
                <Chip 
                  label={`خصم ${discount}%`} 
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    left: 16,
                    bgcolor: '#FF3366',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: '1rem',
                    py: 2.5,
                    px: 1,
                    borderRadius: 3,
                    boxShadow: '0 4px 15px rgba(255, 51, 102, 0.4)'
                  }} 
                />
              )}

              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.15))',
                  transition: 'transform 0.4s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              />
            </Box>
          </Grid>

          {/* Product Info Section */}
          <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 1 }}>
              <Chip label={product.categoryLabel} size="small" sx={{ mb: 2, bgcolor: 'rgba(26, 35, 126, 0.1)', color: '#1a237e', fontWeight: 600 }} />
              {product.limitedTimeOffer && (
                <Chip label="عرض لفترة محدودة" size="small" sx={{ mb: 2, mx: 1, bgcolor: 'warning.light', color: 'warning.dark', fontWeight: 800 }} />
              )}
            </Box>

            <Typography variant="h3" fontWeight={900} sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.75rem' }, letterSpacing: '-0.5px' }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
              <Rating value={product.rating || 4.5} precision={0.5} readOnly size="large" sx={{ color: '#FFD700' }} />
              <Typography variant="body1" color="text.secondary" fontWeight={600}>
                ({product.rating || 4.5})
              </Typography>
            </Box>

            {product.specs && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>المواصفات:</Typography>
                <Chip label={product.specs} variant="outlined" sx={{ borderRadius: 2, fontSize: '1.05rem', py: 2, px: 1 }} />
              </Box>
            )}

            <Box sx={{ p: 3, bgcolor: 'rgba(255, 51, 102, 0.04)', borderRadius: 4, mb: 4, border: '1px solid rgba(255, 51, 102, 0.1)' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="h2" color="success.main" fontWeight={900} sx={{ letterSpacing: '-1px' }}>
                  {formatPrice(product.currentPrice)} <Typography component="span" variant="h5" fontWeight={700}>{ar.currency}</Typography>
                </Typography>
                
                {product.originalPrice > product.currentPrice && (
                  <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through', mb: 1, fontWeight: 600 }}>
                    {formatPrice(product.originalPrice)} {ar.currency}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<ShoppingCart />}
                disabled={!product.inStock}
                sx={{
                  py: 2,
                  bgcolor: '#FF3366',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  borderRadius: 3,
                  boxShadow: '0 8px 24px rgba(255,51,102,0.3)',
                  '&:hover': {
                    bgcolor: '#E62E5C',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 28px rgba(255,51,102,0.4)',
                  }
                }}
              >
                {product.inStock ? ar.addToCart : 'نفدت الكمية'}
              </Button>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Badges/Features */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ p: 1.5, bgcolor: 'rgba(26, 35, 126, 0.08)', borderRadius: 2, color: '#1a237e' }}>
                    <LocalShippingOutlined />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={800}>توصيل سريع</Typography>
                  </Box>
                </Box>  
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ p: 1.5, bgcolor: 'rgba(46, 125, 50, 0.08)', borderRadius: 2, color: '#2e7d32' }}>
                    <VerifiedUserOutlined />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={800}>ضمان أمان</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ProductDetailsPage;
