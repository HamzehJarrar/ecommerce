import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => {
    // Get or create session ID
    let id = localStorage.getItem('sessionId');
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sessionId', id);
    }
    return id;
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [sessionId]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cart/${sessionId}`);
      setCart(response.data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/cart/${sessionId}/items`, {
        productId: product.id,
        name: product.name,
        nameAr: product.nameAr,
        price: product.price,
        quantity,
        image: product.image,
      });
      setCart(response.data.data);
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/cart/${sessionId}/items/${productId}`,
        { quantity }
      );
      setCart(response.data.data);
      return response.data;
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/cart/${sessionId}/items/${productId}`
      );
      setCart(response.data.data);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/cart/${sessionId}`);
      setCart(response.data.data || { items: [], total: 0 });
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getItemCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    sessionId,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemCount,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
