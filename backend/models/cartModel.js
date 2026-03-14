import supabase from '../config/db.js';

// ─── Get Cart Items for a User ─────────────────────────────────────────────
export const getCartByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('cart')
    .select(`
      id,
      quantity,
      product_id,
      products (
        id, name, price, image_url, category, description
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;

  // Flatten: merge product fields into cart item
  return data.map((item) => ({
    cartItemId: item.id,
    quantity: item.quantity,
    ...item.products,
  }));
};

// ─── Add / Increment Cart Item ─────────────────────────────────────────────
export const addCartItem = async (userId, productId, quantity = 1) => {
  // Check if item already exists
  const { data: existing } = await supabase
    .from('cart')
    .select('id, quantity')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (existing) {
    // Increment quantity
    const { data, error } = await supabase
      .from('cart')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Insert new item
  const { data, error } = await supabase
    .from('cart')
    .insert([{ user_id: userId, product_id: productId, quantity }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ─── Update Cart Item Quantity ─────────────────────────────────────────────
export const updateCartItemQuantity = async (cartItemId, userId, quantity) => {
  const { data, error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('id', cartItemId)
    .eq('user_id', userId) // safety check: own item only
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ─── Remove Cart Item ──────────────────────────────────────────────────────
export const removeCartItem = async (cartItemId, userId) => {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartItemId)
    .eq('user_id', userId);

  if (error) throw error;
  return true;
};

// ─── Clear Entire Cart ─────────────────────────────────────────────────────
export const clearUserCart = async (userId) => {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId);

  if (error) throw error;
  return true;
};
