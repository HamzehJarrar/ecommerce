# React Components Templates

All components follow this pattern:

## Template Structure:

```javascript
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
// ... other imports

function ComponentName() {
  const { t, isRTL } = useLanguage();
  const { addToCart } = useCart();  // if needed
  
  return (
    // JSX with {t.section.key} for translations
  );
}

export default ComponentName;
```

## Components to Create:

### Home Components (client/src/components/home/):
1. **HeroCarousel.jsx** - Same as original but uses t.hero.* for text
2. **ProductGrid.jsx** - Uses t.products.* and productAPI.getDeals()
3. **CategorySection.jsx** - Uses t.categorySection.* 
4. **BrandSection.jsx** - Uses t.brands.*
5. **DailyEssentials.jsx** - Uses t.dailyEssentials.*

### Common Components (client/src/components/common/):
1. **ProductCard.jsx** - Reusable product card with Add to Cart

### Pages (client/src/pages/):
1. **HomePage.jsx** - ✅ Already created
2. **CartPage.jsx** - Shopping cart with useCart() hook
3. **ProductDetailsPage.jsx** - Product details with useParams()

## Key Patterns:

### Language Support:
```javascript
const { t, isRTL } = useLanguage();

<Typography>{t.header.cart}</Typography>
<Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
```

### Cart Operations:
```javascript
const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

const handleAddToCart = async () => {
  await addToCart(product, quantity);
};
```

### API Calls:
```javascript
import { productAPI } from '../../services/api';

const fetchProducts = async () => {
  const response = await productAPI.getAll();
  setProducts(response.data.data);
};
```

All components are responsive and support both Arabic (RTL) and English (LTR).
