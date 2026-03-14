// src/services/authService.js
import api from './api.js';

// ─── Register ──────────────────────────────────────────────────────────────
export const registerUser = async ({ name, email, password }) => {
  const { data } = await api.post('/api/users/register', { name, email, password });
  // Persist token and user in localStorage
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.data));
  return data;
};

// ─── Login ─────────────────────────────────────────────────────────────────
export const loginUser = async ({ email, password }) => {
  const { data } = await api.post('/api/users/login', { email, password });
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.data));
  return data;
};

// ─── Logout ────────────────────────────────────────────────────────────────
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// ─── Get Current User (from localStorage) ─────────────────────────────────
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ─── Fetch Profile from API ────────────────────────────────────────────────
export const fetchProfile = async () => {
  const { data } = await api.get('/api/users/me');
  return data.data;
};
