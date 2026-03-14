import * as Product from '../models/productModel.js';

// ─── GET /api/products ─────────────────────────────────────────────────────
export const getProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const products = category && category !== 'all'
      ? await Product.getProductsByCategory(category)
      : await Product.getAllProducts();

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/products/:id ─────────────────────────────────────────────────
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/products ────────────────────────────────────────────────────
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, image_url, category, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'name and price are required' });
    }

    const product = await Product.createProduct({ name, price, image_url, category, description });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/products/:id ─────────────────────────────────────────────────
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, image_url, category, description } = req.body;
    const updated = await Product.updateProduct(req.params.id, {
      name, price, image_url, category, description,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/products/:id ──────────────────────────────────────────────
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.deleteProduct(req.params.id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
