import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import protect from '../middlewares/auth.js';

const router = Router();

// Public routes
router.get('/', getProducts);           // GET /api/products?category=skincare
router.get('/:id', getProduct);         // GET /api/products/:id

// Protected routes (add admin check as needed)
router.post('/', protect, createProduct);       // POST /api/products
router.put('/:id', protect, updateProduct);     // PUT  /api/products/:id
router.delete('/:id', protect, deleteProduct);  // DELETE /api/products/:id

export default router;
