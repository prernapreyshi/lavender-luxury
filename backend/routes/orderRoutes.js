import { Router } from 'express';
import { createOrder, getOrders, getOrder } from '../controllers/orderController.js';
import protect from '../middlewares/auth.js';

const router = Router();

// All order routes are protected
router.use(protect);

router.post('/', createOrder);      // POST /api/orders  (creates order from cart)
router.get('/', getOrders);         // GET  /api/orders
router.get('/:id', getOrder);       // GET  /api/orders/:id

export default router;
