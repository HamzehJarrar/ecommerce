import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie } from '../utils/cookies';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedFavs = getCookie('favorites', []) || [];
    const savedCart = getCookie('cart', []) || [];
    setFavorites(Array.isArray(savedFavs) ? savedFavs : []);
    setCart(Array.isArray(savedCart) ? savedCart : []);
  }, []);

  const toggleFavorite = (product, e) => {
    if (e) e.stopPropagation();
    let newFavs = [...favorites];
    const existsIndex = newFavs.findIndex(f => f._id === product._id);
    if (existsIndex !== -1) {
      newFavs.splice(existsIndex, 1);
    } else {
      newFavs.push(product);
    }
    setFavorites(newFavs);
    setCookie('favorites', newFavs);
  };

  const isFavorite = (productId) => favorites.some(f => f._id === productId);

  const addToCart = (product, quantity = 1, e) => {
    if (e) e.stopPropagation();
    let newCart = [...cart];
    const index = newCart.findIndex(item => item.product._id === product._id);
    if (index !== -1) {
      newCart[index].quantity += quantity;
    } else {
      newCart.push({ product, quantity });
    }
    setCart(newCart);
    setCookie('cart', newCart);
  };

  const updateCartQty = (productId, quantity) => {
    let newCart = [...cart];
    const index = newCart.findIndex(item => item.product._id === productId);
    if (index !== -1) {
      if (quantity <= 0) {
        newCart.splice(index, 1);
      } else {
        newCart[index].quantity = quantity;
      }
      setCart(newCart);
      setCookie('cart', newCart);
    }
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.product._id !== productId);
    setCart(newCart);
    setCookie('cart', newCart);
  };

  const clearCart = () => {
    setCart([]);
    setCookie('cart', []);
  };

  return (
    <StoreContext.Provider value={{ favorites, cart, toggleFavorite, isFavorite, addToCart, updateCartQty, removeFromCart, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
};
