import jwt from 'jsonwebtoken';

// ─── Protect Routes ────────────────────────────────────────────────────────
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, name }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token is invalid or expired' });
  }
};

export default protect;
