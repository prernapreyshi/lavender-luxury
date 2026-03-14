import * as Order from '../models/orderModel.js';
import * as Cart from '../models/cartModel.js';

// ─── POST /api/orders ──────────────────────────────────────────────────────
// Creates an order from the user's current cart and then clears it
export const createOrder = async (req, res, next) => {
  try {
    // Fetch current cart
    const cartItems = await Cart.getCartByUserId(req.user.id);

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Snapshot cart items for the order (stored as JSONB)
    const itemsSnapshot = cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image_url: item.image_url,
    }));

    // Create order
    const order = await Order.createOrder({
      userId: req.user.id,
      items: itemsSnapshot,
      total: parseFloat(total.toFixed(2)),
    });

    // Clear the cart after successful order
    await Cart.clearUserCart(req.user.id);

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/orders ───────────────────────────────────────────────────────
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.getOrdersByUserId(req.user.id);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/orders/:id ───────────────────────────────────────────────────
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.getOrderById(req.params.id, req.user.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
