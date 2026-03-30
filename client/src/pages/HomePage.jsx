import React, { useEffect, useState, useCallback } from 'react';
import PromoBanner from '../components/hero/PromoBanner';
import ProductRowSection from '../components/sections/ProductRowSection';
import { apiGet } from '../services/api';
import { ar } from '../i18n/ar';

function HomePage() {
  const [deals, setDeals] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loadingDeals, setLoadingDeals] = useState(true);
  const [loadingFeat, setLoadingFeat] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const d = await apiGet('/products/deals/today?limit=31');
        if (!cancelled) setDeals(Array.isArray(d) ? d : []);
      } catch (e) {
        console.error(e);
        if (!cancelled) setDeals([]);
      } finally {
        if (!cancelled) setLoadingDeals(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const f = await apiGet('/products/featured/list?limit=9');
        if (!cancelled) setFeatured(Array.isArray(f) ? f : []);
      } catch (e) {
        console.error(e);
        if (!cancelled) setFeatured([]);
      } finally {
        if (!cancelled) setLoadingFeat(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onAddToCart = useCallback((product) => {
    console.log('add to cart', product._id);
  }, []);

  return (
    <>

      <PromoBanner />
      <ProductRowSection
        title={ar.limitedDeals}
        count={loadingDeals ? 0 : deals.length}
        products={deals}
        loading={loadingDeals}
        variant="limited"
        onAddToCart={onAddToCart}
        viewAllHref="/products?offer=true"
      />
      <ProductRowSection
        title={ar.featuredProducts}
        count={loadingFeat ? 0 : featured.length}
        products={featured}
        loading={loadingFeat}
        variant="featured"
        onAddToCart={onAddToCart}
        viewAllHref="/products?featured=true"
      />
    </>
  );
}

export default HomePage;
