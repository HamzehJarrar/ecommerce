import React from 'react';
import { Box, Typography, Grid, Skeleton, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Smartphone as SmartphoneIcon,
  Headphones as HeadphonesIcon,
  Watch as WatchIcon,
  Cable as CableIcon,
  Security as SecurityIcon,
  TabletMac as TabletMacIcon,
  SportsEsports as GamingIcon,
  MobileFriendly as UsedPhonesIcon,
  LocalOffer as OfferIcon,
  Star as StarIcon,
  East 
} from '@mui/icons-material';
import ProductCard from '../product/ProductCard';
import { ar } from '../../i18n/ar';

const getSectionIcon = (title) => {
  if (!title) return <StarIcon />;
  const t = title.toLowerCase();
  if (t.includes('محمول') || t.includes('موبايل') || t.includes('أجهزة موبايل')) return <SmartphoneIcon />;
  if (t.includes('مستعمل') || t.includes('كسر')) return <UsedPhonesIcon />;
  if (t.includes('سماعات') || t.includes('صوت')) return <HeadphonesIcon />;
  if (t.includes('كفرات') || t.includes('حماية')) return <SecurityIcon />;
  if (t.includes('شواحن') || t.includes('كابلات') || t.includes('باور')) return <CableIcon />;
  if (t.includes('ساعات')) return <WatchIcon />;
  if (t.includes('لوحية') || t.includes('تابلت') || t.includes('ايباد')) return <TabletMacIcon />;
  if (t.includes('ألعاب') || t.includes('اكسسوارات')) return <GamingIcon />;
  if (t.includes('عروض') || t.includes('تخفيضات') || t.includes('خصم')) return <OfferIcon />;
  return <StarIcon />;
};

function ProductRowSection({
  title,
  count,
  products,
  loading,
  variant = 'limited',
  onAddToCart,
  viewAllHref = '#',
}) {
  const isFeatured = variant === 'featured';
  
  // Choose gradient based on section type
  const headerGradient = isFeatured 
    ? 'linear-gradient(135deg, #1a237e 0%, #0d1642 100%)' 
    : 'linear-gradient(135deg, #2b2b2b 0%, #181818 100%)';
    
  const accentColor = isFeatured ? '#FF3366' : '#FFD700';

  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      {/* Header Banner */}
      <Box
        sx={{
          background: headerGradient,
          color: 'white',
          py: 2,
          px: { xs: 2, md: 3 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: { xs: 0, md: '16px 16px 0 0' },
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          borderBottom: `4px solid ${accentColor}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box 
            sx={{ 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center',
               bgcolor: 'rgba(255,255,255,0.08)',
               p: 1.25,
               borderRadius: 3,
               color: accentColor,
               boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)'
            }}
          >
            {getSectionIcon(title)}
          </Box>
          <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: 0.5, fontSize: { xs: '1.05rem', md: '1.25rem' } }}>
            {title}
          </Typography>
        </Box>

        {Boolean(count) && (
          <Box
            sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              color: 'white',
              px: { xs: 1.5, md: 2 },
              py: 0.75,
              borderRadius: 4,
              fontWeight: 800,
              fontSize: '0.85rem',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {ar.productsCount(count)}
          </Box>
        )}
      </Box>

      {/* Grid Container */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: { xs: 2, md: 3 },
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.06)',
          borderTop: 0,
          borderRadius: { xs: 0, md: '0 0 16px 16px' },
          boxShadow: { xs: 'none', md: '0 12px 24px rgba(10, 25, 41, 0.05)' },
        }}
      >
        {loading ? (
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={6} sm={4} md={2} key={i}>
                <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3 }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {(products || []).map((p) => (
              <Grid item xs={6} sm={4} md={2} key={p._id}>
                <ProductCard product={p} onAddToCart={onAddToCart} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* View All Button */}
        <Box sx={{ textAlign: 'center', mt: 4, mb: 1 }}>
          <Button
            component={RouterLink}
            to={viewAllHref}
            variant="outlined"
            endIcon={<East sx={{ transform: 'scaleX(-1)' }} />}
            sx={{
              color: 'text.primary',
              borderColor: 'rgba(0,0,0,0.15)',
              fontWeight: 800,
              borderRadius: 10,
              px: 4,
              py: 1,
              textTransform: 'none',
              '&:hover': {
                borderColor: accentColor,
                bgcolor: 'rgba(255, 51, 102, 0.04)',
                color: accentColor,
              }
            }}
          >
            {ar.viewAllDeals}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductRowSection;
