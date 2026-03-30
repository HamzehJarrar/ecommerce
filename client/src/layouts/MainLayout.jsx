import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import HassanHeader from '../components/header/HassanHeader';
import CategorySidebar from '../components/sidebar/CategorySidebar';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../services/api';
import { ar } from '../i18n/ar';

function MainLayout({ children }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState('home');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiGet('/categories');
        if (!cancelled) setCategories(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (!cancelled) setCategories([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <HassanHeader favoritesCount={0} cartCount={0} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'flex-start' },
          flex: 1,
        }}
      >
        <CategorySidebar
          categories={categories}
          loading={loading}
          activeSlug={activeSlug}
          onSelect={(slug) => {
            setActiveSlug(slug);
            if (slug === 'home') navigate('/');
            else navigate(`/products?category=${slug}`);
          }}
        />
        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            py: 2,
            px: { xs: 1, sm: 2 },
          }}
        >
          <Container maxWidth="xl" disableGutters>
            {children}
          </Container>
        </Box>
      </Box>
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: 'center',
          bgcolor: 'grey.900',
          color: 'grey.400',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} {ar.brand} — {ar.footer.rights}
        </Typography>
      </Box>
    </Box>
  );
}

export default MainLayout;
