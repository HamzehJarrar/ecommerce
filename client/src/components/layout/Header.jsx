import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  InputBase,
  Badge,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  KeyboardArrowDown as ArrowDownIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.95),
  '&:hover': {
    backgroundColor: theme.palette.common.white,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t, toggleLanguage, language, isRTL } = useLanguage();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const categories = [
    { key: 'groceries', label: t.categories.groceries },
    { key: 'premiumFruits', label: t.categories.premiumFruits },
    { key: 'homeKitchen', label: t.categories.homeKitchen },
    { key: 'fashion', label: t.categories.fashion },
    { key: 'electronics', label: t.categories.electronics },
    { key: 'beauty', label: t.categories.beauty },
    { key: 'homeImprovement', label: t.categories.homeImprovement },
    { key: 'sportsToys', label: t.categories.sportsToys },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          MegaMart
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {categories.map((category) => (
          <ListItem button key={category.key}>
            <ListItemText primary={category.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={toggleLanguage}>
          <LanguageIcon sx={{ mr: 1 }} />
          <ListItemText primary={language === 'ar' ? 'English' : 'العربية'} />
        </ListItem>
        <ListItem button>
          <PersonIcon sx={{ mr: 1 }} />
          <ListItemText primary={t.header.signIn} />
        </ListItem>
        <ListItem button onClick={() => navigate('/cart')}>
          <CartIcon sx={{ mr: 1 }} />
          <ListItemText primary={t.header.cart} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'text.primary' }} elevation={1}>
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography
              variant="h5"
              component="div"
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                mr: 3,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              <MenuIcon sx={{ mr: 1 }} />
              MegaMart
            </Typography>

            {!isMobile && (
              <SearchBox sx={{ flexGrow: 1, maxWidth: 600 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder={t.header.search}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </SearchBox>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile && (
              <>
                <Button
                  color="inherit"
                  startIcon={<LocationIcon />}
                  sx={{ mr: 2, color: 'text.secondary' }}
                >
                  {t.header.deliverTo} <strong style={{ marginLeft: 4, marginRight: 4 }}>423651</strong>
                </Button>
                <Button color="inherit" sx={{ mr: 2 }}>
                  {t.header.trackOrder}
                </Button>
                <Button color="inherit" sx={{ mr: 2 }}>
                  {t.header.allOffers}
                </Button>
                <IconButton color="inherit" onClick={toggleLanguage} sx={{ mr: 2 }}>
                  <LanguageIcon />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {language === 'ar' ? 'EN' : 'ع'}
                  </Typography>
                </IconButton>
              </>
            )}

            <IconButton color="inherit" sx={{ mr: 1 }}>
              <PersonIcon />
            </IconButton>
            {!isMobile && (
              <Button color="inherit" sx={{ mr: 2 }}>
                {t.header.signIn}
              </Button>
            )}
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={getItemCount()} color="primary">
                <CartIcon />
              </Badge>
            </IconButton>
            {!isMobile && (
              <Typography variant="body2" sx={{ ml: 1 }}>
                {t.header.cart}
              </Typography>
            )}
          </Toolbar>

          {isMobile && (
            <Box sx={{ pb: 2, px: 2 }}>
              <SearchBox>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder={t.header.search}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </SearchBox>
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ borderTop: 1, borderColor: 'divider', py: 1 }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {categories.map((category, index) => (
                  <Button
                    key={category.key}
                    color="inherit"
                    endIcon={<ArrowDownIcon />}
                    onClick={handleCategoryClick}
                    sx={{ 
                      fontSize: '0.875rem',
                      color: index === 0 ? 'primary.main' : 'text.primary',
                      fontWeight: index === 0 ? 600 : 400,
                    }}
                  >
                    {category.label}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor={isRTL ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Subcategory 1</MenuItem>
        <MenuItem onClick={handleClose}>Subcategory 2</MenuItem>
        <MenuItem onClick={handleClose}>Subcategory 3</MenuItem>
      </Menu>
    </>
  );
}

export default Header;
