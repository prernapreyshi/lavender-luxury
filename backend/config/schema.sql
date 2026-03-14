-- ================================================================
-- Lavender Luxury — Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ================================================================

-- ─── USERS ────────────────────────────────────────────────────────────────
create table if not exists users (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text unique not null,
  password    text not null,          -- bcrypt hashed
  created_at  timestamptz default now()
);

-- ─── PRODUCTS ─────────────────────────────────────────────────────────────
create table if not exists products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  price        numeric(10, 2) not null,
  image_url    text,
  category     text,
  description  text,
  created_at   timestamptz default now()
);

-- ─── CART ─────────────────────────────────────────────────────────────────
create table if not exists cart (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references users(id) on delete cascade,
  product_id  uuid not null references products(id) on delete cascade,
  quantity    int not null default 1 check (quantity > 0),
  created_at  timestamptz default now(),
  unique(user_id, product_id)          -- one row per user+product pair
);

-- ─── ORDERS ───────────────────────────────────────────────────────────────
create table if not exists orders (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references users(id) on delete cascade,
  items       jsonb not null,          -- snapshot of cart at checkout time
  total       numeric(10, 2) not null,
  status      text not null default 'pending'
                check (status in ('pending','processing','shipped','delivered','cancelled')),
  created_at  timestamptz default now()
);

-- ─── SEED: 9 Lavender Luxury Products ─────────────────────────────────────
-- (image_url left blank — use your hosted asset URLs or Supabase Storage URLs)
insert into products (name, price, image_url, category, description) values
  ('Lavender Serum',          49.99, '', 'skincare',
   'A luxurious lavender-infused serum that nourishes and rejuvenates your skin with natural botanical extracts.'),
  ('Calming Candle',          29.99, '', 'home',
   'Hand-poured soy candle with pure lavender essential oil. Creates a peaceful atmosphere.'),
  ('Lavender Soap',           19.99, '', 'bath',
   'Artisan-crafted soap bars made with organic lavender oil and natural ingredients.'),
  ('Essential Oil',           34.99, '', 'aromatherapy',
   'Pure lavender essential oil extracted from the finest lavender blooms.'),
  ('Body Cream',              39.99, '', 'skincare',
   'Rich, nourishing body cream infused with lavender and shea butter.'),
  ('Bath Salts',              24.99, '', 'bath',
   'Mineral-rich bath salts blended with dried lavender flowers.'),
  ('Aromatherapy Diffuser',   54.99, '', 'aromatherapy',
   'Modern ultrasonic essential oil diffuser with LED lighting.'),
  ('Pillow Spray',            22.99, '', 'home',
   'Calming pillow and linen spray infused with pure lavender essential oil.'),
  ('Lavender Face Mask',      32.99, '', 'skincare',
   'Rejuvenating clay face mask enriched with lavender extract and natural botanicals.')
on conflict do nothing;
