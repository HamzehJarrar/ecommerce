import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
} from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon, ShoppingCart as CartIcon } from '@mui/icons-material';
import { useStore } from '../../contexts/StoreContext';
import { ar } from '../../i18n/ar';
import { formatPrice } from '../../utils/formatCurrency';

function FavoritesDrawer({ open, onClose }) {
  const { favorites, toggleFavorite, addToCart } = useStore();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          background: 'rgba(10, 25, 41, 0.85)',
          color: 'white',
        }}
      >
        <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '0.5px' }}>
          {ar.favorites || 'المفضلة'}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
        {favorites.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: 2,
              opacity: 0.6,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255, 51, 102, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FF3366',
              }}
            >
              <CloseIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              قائمة المفضلة فارغة
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              لم تقم بإضافة أي منتجات للمفضلة بعد
            </Typography>
          </Box>
        ) : (
          <List sx={{ pt: 0 }}>
            {favorites.map((product) => (
              <Box key={product._id} sx={{ mb: 2, borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', p: 1, transition: 'all 0.2s ease', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }}>
                <ListItem disablePadding sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    component="img"
                    src={product.image}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: '8px',
                      background: '#f8f8f8',
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight="700" noWrap sx={{ mb: 0.5 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight="bold">
                      {formatPrice(product.currentPrice)} {ar.currency}
                    </Typography>
                  </Box>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={(e) => toggleFavorite(product, e)}
                    sx={{
                      background: 'rgba(255, 51, 102, 0.05)',
                      '&:hover': { background: 'rgba(255, 51, 102, 0.1)' },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItem>
                <Box sx={{ mt: 1.5 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    startIcon={<CartIcon sx={{ ml: 1, mr: 0 }} />}
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #FF3366 0%, #FF9933 100%)',
                      '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(255, 51, 102, 0.3)' },
                    }}
                  >
                    {ar.addToCart || 'إضافة للسلة'}
                  </Button>
                </Box>
              </Box>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
}

export default FavoritesDrawer;
