import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { ar } from '../../i18n/ar';

function PromoBanner() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #b71c1c 0%, #7f0000 50%, #1a237e 100%)',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 220,
        display: 'flex',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 800,
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            mb: 1,
          }}
        >
          {ar.heroTitle}  
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', maxWidth: 480 }}>
          {ar.heroSubtitle}
        </Typography>
      </Container>
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: { xs: '100%', md: '55%' },
          height: '100%',
          objectFit: 'cover',
          WebkitMaskImage: { 
            xs: 'linear-gradient(to bottom, black 30%, transparent 100%)',
            md: 'linear-gradient(to right, black 50%, transparent 100%)' 
          },
          opacity: 0.8,
          zIndex: 0,
        }}
        alt="Mobile Phones Background"
      />
    </Box>
  );
}

export default PromoBanner;
