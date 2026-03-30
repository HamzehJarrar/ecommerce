import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  CardActionArea
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { ar } from '../../i18n/ar';
import { formatPrice } from '../../utils/formatCurrency';
import { useStore } from '../../contexts/StoreContext';

function ProductCard({ product }) {
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const navigate = useNavigate();
  const discount = Math.round(product.discountPercent || 0);
  const fav = isFavorite(product._id);

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleFavClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
          transform: 'translateY(-4px)',
          borderColor: 'primary.main'
        },
      }}
    >
      <Box
        sx={{
          px: 1,
          pt: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        <IconButton
          size="small"
          aria-label="مفضلة"
          onClick={handleFavClick}
          sx={{ 
            color: fav ? '#FF3366' : 'text.secondary',
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(4px)',
            '&:hover': { bgcolor: 'white', color: '#FF3366' }
          }}
        >
          {fav ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        {discount > 0 && (
          <Chip
            label={`-${discount}%`}
            size="small"
            sx={{
              bgcolor: '#FF3366',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.75rem',
              boxShadow: '0 2px 8px rgba(255,51,102,0.4)'
            }}
          />
        )}
      </Box>

      <CardActionArea 
        onClick={handleCardClick}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box
          sx={{
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            mt: 3
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ 
              maxHeight: '100%', 
              maxWidth: '100%', 
              objectFit: 'contain',
              transition: 'transform 0.4s ease',
              '.MuiCardActionArea-root:hover &': {
                transform: 'scale(1.08)'
              }
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, pt: 1, pb: 2, px: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="caption"
            align="center"
            sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5 }}
          >
            {product.categoryLabel}
          </Typography>
          
          <Typography
            variant="body1"
            align="center"
            sx={{ fontWeight: 800, mb: 1, minHeight: 48, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {product.name}
          </Typography>

          {product.specs ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Chip label={product.specs} size="small" variant="outlined" sx={{ borderRadius: 2 }} />
            </Box>
          ) : (
            <Box sx={{ mb: 2, minHeight: 24 }} />
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: 1.5,
              flexWrap: 'wrap',
              mt: 'auto',
              mb: 2,
            }}
          >
            {product.originalPrice > product.currentPrice && (
              <Typography
                variant="body2"
                sx={{ textDecoration: 'line-through', color: 'text.secondary', fontWeight: 600 }}
              >
                {formatPrice(product.originalPrice)} {ar.currency}
              </Typography>
            )}
            <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 900 }}>
              {formatPrice(product.currentPrice)} {ar.currency}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      
      <Box sx={{ px: 2, pb: 2 }}>
        <IconButton
          onClick={handleAddToCart}
          sx={{
            width: '100%',
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 3,
            py: 1,
            transition: 'all 0.2s',
            '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.02)' },
          }}
          aria-label={ar.addToCart}
        >
          <ShoppingCartOutlined />
        </IconButton>
      </Box>
    </Card>
  );
}

export default ProductCard;
