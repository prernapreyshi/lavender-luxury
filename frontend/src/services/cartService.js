// src/services/cartService.js
import api from './api.js';

// ─── Get Cart ──────────────────────────────────────────────────────────────
export const fetchCart = async () => {
  const { data } = await api.get('/api/cart');
  return data.data;
};

// ─── Add Item to Cart ──────────────────────────────────────────────────────
export const addItemToCart = async (productId, quantity = 1) => {
  const { data } = await api.post('/api/cart', { productId, quantity });
  return data.data;
};

// ─── Update Cart Item Quantity ─────────────────────────────────────────────
export const updateCartItemQty = async (cartItemId, quantity) => {
  const { data } = await api.put(`/api/cart/${cartItemId}`, { quantity });
  return data.data;
};

// ─── Remove Cart Item ──────────────────────────────────────────────────────
export const removeItemFromCart = async (cartItemId) => {
  const { data } = await api.delete(`/api/cart/${cartItemId}`);
  return data;
};

// ─── Clear Entire Cart ─────────────────────────────────────────────────────
export const clearCartApi = async () => {
  const { data } = await api.delete('/api/cart');
  return data;
};
