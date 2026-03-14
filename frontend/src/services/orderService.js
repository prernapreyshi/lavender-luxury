// src/services/orderService.js
import api from './api.js';

// ─── Create Order (from current cart) ─────────────────────────────────────
export const placeOrder = async () => {
  const { data } = await api.post('/api/orders');
  return data.data;
};

// ─── Get All Orders for Current User ──────────────────────────────────────
export const fetchOrders = async () => {
  const { data } = await api.get('/api/orders');
  return data.data;
};

// ─── Get Single Order by ID ────────────────────────────────────────────────
export const fetchOrderById = async (id) => {
  const { data } = await api.get(`/api/orders/${id}`);
  return data.data;
};
