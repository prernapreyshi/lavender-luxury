import supabase from '../config/db.js';

// ─── Find User by Email ────────────────────────────────────────────────────
export const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  // "not found" is not a hard error here — return null
  if (error && error.code === 'PGRST116') return null;
  if (error) throw error;
  return data;
};

// ─── Find User by ID ───────────────────────────────────────────────────────
export const findUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, created_at')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// ─── Create User ───────────────────────────────────────────────────────────
export const createUser = async ({ name, email, password }) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password }])
    .select('id, name, email, created_at')
    .single();

  if (error) throw error;
  return data;
};
