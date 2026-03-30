import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import ProductCard from '../components/product/ProductCard';
import { apiGet } from '../services/api';

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');
  const isOffer = searchParams.get('offer') === 'true';
  const isFeatured = searchParams.get('featured') === 'true';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        let endpoint = '/products?limit=50';
        if (isOffer) {
          endpoint = '/products/deals/today?limit=50';
        } else if (isFeatured) {
          endpoint = '/products/featured/list?limit=50';
        } else if (category && category !== 'home') {
          endpoint = `/products?category=${category}&limit=50`;
        }
        
        let data = await apiGet(endpoint);
        
        if (!cancelled && data) {
          if (Array.isArray(data)) {
            setProducts(data);
          } else if (data.products) {
            setProducts(data.products);
          } else {
            setProducts([]);
          }
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [category, isOffer, isFeatured]);

  let pageTitle = 'جميع المنتجات';
  if (isOffer) pageTitle = 'عروض وخصومات';
  if (isFeatured) pageTitle = 'منتجات مميزة';
  if (category && category !== 'home') pageTitle = `قسم: ${category}`;

  const onAddToCart = (product) => {
    console.log('add to cart', product._id);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 4 }}>
        {pageTitle}
      </Typography>

      {loading ? (
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={i}>
              <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      ) : products.length === 0 ? (
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h5" color="text.secondary">لا توجد منتجات حالياً</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {products.map(p => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={p._id}>
              <ProductCard product={p} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ProductsPage;
