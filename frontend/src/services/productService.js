// src/services/productService.js
import api from './api.js';

// ─── Fetch All Products (optional category filter) ─────────────────────────
export const fetchProducts = async (category = 'all') => {
  const params = category && category !== 'all' ? { category } : {};
  const { data } = await api.get('/api/products', { params });
  return data.data; // array of products
};

// ─── Fetch Single Product by ID ────────────────────────────────────────────
export const fetchProductById = async (id) => {
  const { data } = await api.get(`/api/products/${id}`);
  return data.data;
};
