import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './components/product/ProductDetailsPage';
import { StoreProvider } from './contexts/StoreContext';

function App() {
  return (
    <StoreProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </StoreProvider>
  );
}

export default App;
