import { Router } from 'express';
import { register, login, getMe } from '../controllers/userController.js';
import protect from '../middlewares/auth.js';

const router = Router();

router.post('/register', register);   // POST /api/users/register
router.post('/login', login);         // POST /api/users/login
router.get('/me', protect, getMe);    // GET  /api/users/me (protected)

export default router;
