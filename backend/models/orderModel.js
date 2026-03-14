import supabase from '../config/db.js';

// ─── Create Order ──────────────────────────────────────────────────────────
export const createOrder = async ({ userId, items, total }) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([{
      user_id: userId,
      items,      // JSONB snapshot of cart items
      total,
      status: 'pending',
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ─── Get Orders for a User ─────────────────────────────────────────────────
export const getOrdersByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// ─── Get Order by ID ───────────────────────────────────────────────────────
export const getOrderById = async (orderId, userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('user_id', userId) // ensure ownership
    .single();

  if (error) throw error;
  return data;
};
