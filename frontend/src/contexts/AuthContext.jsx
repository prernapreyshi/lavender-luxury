// src/contexts/AuthContext.jsx
// ─── NEW FILE — does not replace any existing file ────────────────────────
// Wrap your app with <AuthProvider> inside App.jsx (see instructions below).

import React, { createContext, useContext, useState, useCallback } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '@/services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser); // restore from localStorage on load
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── Login ───────────────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(credentials);
      setUser(data.data);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Register ─────────────────────────────────────────────────────────────
  const register = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(credentials);
      setUser(data.data);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
