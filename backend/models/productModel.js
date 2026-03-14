import supabase from '../config/db.js';

// ─── Get All Products ──────────────────────────────────────────────────────
export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

// ─── Get Product by ID ─────────────────────────────────────────────────────
export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// ─── Get Products by Category ──────────────────────────────────────────────
export const getProductsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

// ─── Create Product ────────────────────────────────────────────────────────
export const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ─── Update Product ────────────────────────────────────────────────────────
export const updateProduct = async (id, productData) => {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ─── Delete Product ────────────────────────────────────────────────────────
export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};
