import * as Cart from '../models/cartModel.js';

// ─── GET /api/cart ─────────────────────────────────────────────────────────
export const getCart = async (req, res, next) => {
  try {
    const cartItems = await Cart.getCartByUserId(req.user.id);
    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/cart ────────────────────────────────────────────────────────
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'productId is required' });
    }

    const item = await Cart.addCartItem(req.user.id, productId, quantity);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/cart/:cartItemId ─────────────────────────────────────────────
export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { cartItemId } = req.params;

    if (quantity === undefined) {
      return res.status(400).json({ success: false, message: 'quantity is required' });
    }

    // If quantity is 0 or less, remove the item
    if (quantity <= 0) {
      await Cart.removeCartItem(cartItemId, req.user.id);
      return res.status(200).json({ success: true, message: 'Cart item removed' });
    }

    const updated = await Cart.updateCartItemQuantity(cartItemId, req.user.id, quantity);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/cart/:cartItemId ──────────────────────────────────────────
export const removeFromCart = async (req, res, next) => {
  try {
    await Cart.removeCartItem(req.params.cartItemId, req.user.id);
    res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/cart ──────────────────────────────────────────────────────
export const clearCart = async (req, res, next) => {
  try {
    await Cart.clearUserCart(req.user.id);
    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};
