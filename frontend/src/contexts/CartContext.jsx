// src/contexts/CartContext.jsx
// ─── REPLACE your existing CartContext.jsx with this file ─────────────────
// UI is IDENTICAL. Only data-layer logic (API calls) added.
// When the user is not logged in, cart stays local (same UX as before).
// When logged in, every cart action is synced with the backend.

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import {
  fetchCart,
  addItemToCart,
  updateCartItemQty,
  removeItemFromCart,
  clearCartApi,
} from '@/services/cartService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// ─── Reducer (unchanged from original) ────────────────────────────────────
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

// ─── Helper: is the user logged in? ───────────────────────────────────────
const isLoggedIn = () => !!localStorage.getItem('token');

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // ─── Load cart from API on mount (if authenticated) ─────────────────────
  useEffect(() => {
    if (!isLoggedIn()) return;
    fetchCart()
      .then((items) => {
        // Map API response to the shape components expect
        const mapped = items.map((item) => ({
          id: item.id,
          cartItemId: item.cartItemId,
          name: item.name,
          price: item.price,
          image: item.image_url,
          category: item.category,
          description: item.description,
          quantity: item.quantity,
        }));
        dispatch({ type: 'SET_ITEMS', payload: mapped });
      })
      .catch(() => {
        // Silently fall back to empty local cart
      });
  }, []);

  // ─── addItem ──────────────────────────────────────────────────────────────
  const addItem = useCallback(async (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    if (isLoggedIn()) {
      try {
        const updated = await addItemToCart(product.id, 1);
        // Sync cartItemId returned from backend into local state
        dispatch({
          type: 'SET_ITEMS',
          payload: state.items
            .map((i) =>
              i.id === product.id
                ? { ...i, cartItemId: updated.id, quantity: i.quantity + 1 }
                : i
            )
            .concat(
              state.items.find((i) => i.id === product.id)
                ? []
                : [{ ...product, cartItemId: updated.id, quantity: 1 }]
            ),
        });
      } catch {
        // Optimistic update already applied — leave it
      }
    }
  }, [state.items]);

  // ─── removeItem ───────────────────────────────────────────────────────────
  const removeItem = useCallback(async (id) => {
    const cartItem = state.items.find((i) => i.id === id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    if (isLoggedIn() && cartItem?.cartItemId) {
      try {
        await removeItemFromCart(cartItem.cartItemId);
      } catch {
        // Optimistic update already applied
      }
    }
  }, [state.items]);

  // ─── updateQuantity ───────────────────────────────────────────────────────
  const updateQuantity = useCallback(async (id, quantity) => {
    const cartItem = state.items.find((i) => i.id === id);
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    if (isLoggedIn() && cartItem?.cartItemId) {
      try {
        if (quantity <= 0) {
          await removeItemFromCart(cartItem.cartItemId);
        } else {
          await updateCartItemQty(cartItem.cartItemId, quantity);
        }
      } catch {
        // Optimistic update already applied
      }
    }
  }, [state.items]);

  // ─── clearCart ────────────────────────────────────────────────────────────
  const clearCart = useCallback(async () => {
    dispatch({ type: 'CLEAR_CART' });
    if (isLoggedIn()) {
      try {
        await clearCartApi();
      } catch {
        // Optimistic update already applied
      }
    }
  }, []);

  // ─── Sidebar helpers (unchanged) ──────────────────────────────────────────
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const openCart   = () => dispatch({ type: 'OPEN_CART' });
  const closeCart  = () => dispatch({ type: 'CLOSE_CART' });

  const getTotalItems = () => state.items.reduce((t, i) => t + i.quantity, 0);
  const getTotalPrice = () => state.items.reduce((t, i) => t + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
