import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import protect from '../middlewares/auth.js';

const router = Router();

// All cart routes are protected — user must be logged in
router.use(protect);

router.get('/', getCart);                         // GET    /api/cart
router.post('/', addToCart);                      // POST   /api/cart
router.put('/:cartItemId', updateCartItem);       // PUT    /api/cart/:cartItemId
router.delete('/:cartItemId', removeFromCart);    // DELETE /api/cart/:cartItemId
router.delete('/', clearCart);                    // DELETE /api/cart (clear all)

export default router;
