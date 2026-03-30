import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  InputBase,
} from '@mui/material';
import {
  Search as SearchIcon,
  FavoriteBorder as FavoriteIcon,
  ShoppingCartOutlined as CartIcon,
  PersonOutline as PersonIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { ar } from '../../i18n/ar';
import { useStore } from '../../contexts/StoreContext';
import CartDrawer from '../cart/CartDrawer';

const SearchWrap = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 5,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  flexGrow: 1,
  maxWidth: 600,
  margin: '0 auto',
  color: theme.palette.common.white,
  display: 'flex',
  transition: 'all 0.3s ease',
}));

const SearchIconWrap = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
  color: alpha(theme.palette.common.white, 0.7),
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 6, 1.5, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

function HassanHeader() {
  const [q, setQ] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const { cart, favorites } = useStore();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const favoritesCount = favorites.length;

  const handleSearch = (e) => {
    if (e.key === 'Enter' && q.trim()) {
      navigate(`/products?search=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(10, 25, 41, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          color: '#fff',
        }}
      >
        <Toolbar sx={{ py: 1, gap: 2, justifyContent: 'space-between' }}>
          {/* Logo and Menu Box */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ color: 'white', display: { md: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Box
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FF3366 0%, #FF9933 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  boxShadow: '0 4px 14px 0 rgba(255, 51, 102, 0.39)',
                }}
              >
                HS
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #fff, #a0aab2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  display: { xs: 'none', sm: 'block' },
                  letterSpacing: '0.5px'
                }}
              >
                {ar.brand}
              </Typography>
            </Box>
          </Box>

          {/* Search Bar - Center */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <SearchWrap>
              <SearchIconWrap>
                <SearchIcon />
              </SearchIconWrap>
              <StyledInput
                placeholder={ar.searchPlaceholder || 'ابحث عن منتج...'}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={handleSearch}
                inputProps={{ 'aria-label': 'search' }}
              />
            </SearchWrap>
          </Box>

          {/* Action Icons - Right */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
            <IconButton
              sx={{
                color: 'white',
                '&:hover': { background: 'rgba(255,255,255,0.1)' },
              }}
            >
              <PersonIcon />
            </IconButton>
            
            <IconButton
              sx={{
                color: 'white',
                '&:hover': { background: 'rgba(255,255,255,0.1)' },
              }}
            >
              <Badge badgeContent={favoritesCount} color="secondary" sx={{ '& .MuiBadge-badge': { background: '#FF3366', color: 'white' } }}>
                <FavoriteIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              onClick={() => setCartOpen(true)}
              sx={{
                color: 'white',
                background: 'rgba(255, 51, 102, 0.1)',
                border: '1px solid rgba(255, 51, 102, 0.3)',
                borderRadius: '12px',
                px: { xs: 1.5, sm: 2.5 },
                py: 1,
                marginLeft: { xs: 0, sm: 1 },
                '&:hover': { background: 'rgba(255, 51, 102, 0.2)' },
                display: 'flex',
                gap: 1.5,
                transition: 'all 0.2s ease',
              }}
            >
              <Badge badgeContent={cartCount} color="error" sx={{ '& .MuiBadge-badge': { background: '#FF3366', color: 'white' } }}>
                <CartIcon />
              </Badge>
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 'bold' }}>
                {ar.cart}
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
        
        {/* Mobile Search Bar */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, px: 2, pb: 2, pt: 0.5 }}>
          <SearchWrap sx={{ maxWidth: '100%', width: '100%' }}>
            <SearchIconWrap>
              <SearchIcon />
            </SearchIconWrap>
            <StyledInput
              placeholder={ar.searchPlaceholder || 'ابحث عن منتج...'}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handleSearch}
            />
          </SearchWrap>
        </Box>
      </AppBar>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default HassanHeader;
