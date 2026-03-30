import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Skeleton,
} from '@mui/material';
import { 
  Home as HomeIcon,
  Smartphone as SmartphoneIcon,
  Headphones as HeadphonesIcon,
  Watch as WatchIcon,
  Cable as CableIcon,
  Security as SecurityIcon,
  TabletMac as TabletMacIcon,
  SportsEsports as GamingIcon,
  MobileFriendly as UsedPhonesIcon,
  Category as DefaultIcon
} from '@mui/icons-material';

const getCategoryIcon = (slug, fallbackIcon) => {
  const iconProps = { fontSize: 'medium' };
  switch (slug?.toLowerCase()) {
    case 'home': return <HomeIcon {...iconProps} />;
    case 'mobiles':
    case 'phones':
    case 'smartphones':
      return <SmartphoneIcon {...iconProps} />;
    case 'used':
    case 'used-mobiles':
      return <UsedPhonesIcon {...iconProps} />;
    case 'headphones':
    case 'audio':
    case 'earbuds':
    case 'earphones':
      return <HeadphonesIcon {...iconProps} />;
    case 'covers':
    case 'cases':
    case 'protection':
      return <SecurityIcon {...iconProps} />;
    case 'chargers':
    case 'acc':
    case 'cables':
    case 'power':
      return <CableIcon {...iconProps} />;
    case 'watches':
    case 'smartwatches':
      return <WatchIcon {...iconProps} />;
    case 'tablets':
    case 'ipads':
      return <TabletMacIcon {...iconProps} />;
    case 'gaming':
    case 'accessories':
      return <GamingIcon {...iconProps} />;
    default:
      if (fallbackIcon && typeof fallbackIcon !== 'object') return <span>{fallbackIcon}</span>;
      return <DefaultIcon {...iconProps} />;
  }
};

const defaultMobileCategories = [
  { slug: 'home', nameAr: 'الرئيسية' },
  { slug: 'mobiles', nameAr: 'أجهزة المحمول' },
  { slug: 'used-mobiles', nameAr: 'مستعمل' },
  { slug: 'covers', nameAr: 'كفرات وحماية' },
  { slug: 'headphones', nameAr: 'سماعات ومكبرات' },
  { slug: 'chargers', nameAr: 'شواحن وكابلات' },
  { slug: 'smartwatches', nameAr: 'ساعات ذكية' },
  { slug: 'gaming', nameAr: 'ألعاب وإكسسوارات' },
];

function CategorySidebar({ categories, loading, activeSlug, onSelect }) {
  const displayCategories = categories && categories.length > 0 ? categories : defaultMobileCategories;

  return (
    <Paper
      elevation={0}
      sx={{
        width: { xs: '100%', md: 280 }, 
        flexShrink: 0,
        borderRadius: { xs: 0, md: 4 }, 
        m: { xs: 0, md: 2 }, 
        bgcolor: 'background.paper',
        boxShadow: { xs: 'none', md: '0 8px 32px rgba(10, 25, 41, 0.08)' }, 
        minHeight: { md: 'calc(100vh - 120px)' },
        overflow: 'hidden',
        border: { xs: 'none', md: '1px solid rgba(0,0,0,0.04)' }
      }}
    >
      <Box sx={{ 
        p: 2.5, 
        background: 'rgba(10, 25, 41, 0.85)',
        color: 'white',
        borderBottom: '4px solid #FF3366',
        textAlign: 'center'
      }}>
        <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: 0.5 }}>
          تصفح الأقسام
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
          اكتشف أحدث العروض والمنتجات
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ p: 2 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} height={56} variant="rounded" sx={{ mb: 1.5, borderRadius: 2 }} />
          ))}
        </Box>
      ) : (
        <List sx={{ p: 2 }}>
          {displayCategories.map((cat) => {
            const isActive = activeSlug === cat.slug;
            return (
              <ListItemButton
                key={cat._id || cat.slug}
                selected={isActive}
                onClick={() => onSelect?.(cat.slug)}
                sx={{
                  py: 1.5,
                  px: 2,
                  mb: 1,
                  borderRadius: 3, 
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255, 51, 102, 0.06)',
                    transform: 'translateX(-6px)',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255, 51, 102, 0.12)',
                    color: '#FF3366',
                    boxShadow: '0 4px 12px rgba(255, 51, 102, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 51, 102, 0.18)',
                    },
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 44, 
                    color: isActive ? '#FF3366' : 'text.secondary',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {getCategoryIcon(cat.slug, cat.icon)}
                </ListItemIcon>
                <ListItemText
                  primary={cat.nameAr}
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 800 : 600, 
                    fontSize: '1rem',
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      )}
    </Paper>
  );
}

export default CategorySidebar;
