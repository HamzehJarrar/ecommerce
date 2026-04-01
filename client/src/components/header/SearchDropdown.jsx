import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
} from '@mui/material';

function SearchDropdown({ 
  loading, 
  results, 
  q, 
  onResultClick, 
  onSeeAllClick, 
  formatPrice, 
  ar 
}) {
  return (
    <Paper
      sx={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        width: { xs: '90%', md: '60%' },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        maxHeight: 400,
        overflowY: 'auto',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <List sx={{ p: 0 }}>
        {loading ? (
          <Box sx={{ p: 3, textAlign: 'center', color: '#FF3366' }}>
            <CircularProgress size={24} color="inherit" />
          </Box>
        ) : results.length > 0 ? (
          <>
            {results.map((product) => (
              <ListItem
                key={product._id}
                button
                onClick={() => onResultClick(product._id)}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                  '&:last-child': { borderBottom: 0 },
                  '&:hover': { background: 'rgba(255, 51, 102, 0.05)' },
                }}
              >
                <ListItemAvatar sx={{ minWidth: 60 }}>
                  <Avatar
                    src={product.image}
                    variant="rounded"
                    sx={{ width: 44, height: 44, bgcolor: '#f5f5f5' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" component="div" fontWeight="bold" sx={{ color: '#333' }}>
                      {product.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: '#FF3366', fontWeight: 'bold' }}>
                      {formatPrice(product.currentPrice)} {ar.currency}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={onSeeAllClick}
              sx={{
                py: 1,
                textAlign: 'center',
                background: 'rgba(255, 51, 102, 0.1)',
                '&:hover': { background: 'rgba(255, 51, 102, 0.2)' },
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF3366' }}>
                    عرض كل النتائج لـ "{q}"
                  </Typography>
                }
              />
            </ListItem>
          </>
        ) : (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              لا توجد منتجات مطابقة لـ "{q}"
            </Typography>
          </Box>
        )}
      </List>
    </Paper>
  );
}

export default SearchDropdown;
