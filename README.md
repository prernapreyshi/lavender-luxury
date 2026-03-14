# 🌿 Lavender Luxury — Full-Stack Project

A complete e-commerce application built with React + Vite + Tailwind (frontend)
and Express.js + Supabase (backend).

```
lavender-luxury/
├── frontend/     ← React + Vite + Tailwind + shadcn/ui
└── backend/      ← Express.js + Supabase + JWT Auth
```

---

## 🗄️ Step 1 — Set Up Supabase (Database)

1. Go to [supabase.com](https://supabase.com) → create a **New Project**
2. Go to **SQL Editor → New Query**
3. Paste the entire contents of `backend/config/schema.sql` and click **Run**
4. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon / public` key

> This creates all 4 tables (users, products, cart, orders) and seeds 9 products.

---

## ⚙️ Step 2 — Configure & Run Backend

```bash
cd backend
cp .env.example .env
```

Fill in your `.env`:
```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
JWT_SECRET=any_long_random_string_32_chars_min
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

```bash
npm install
npm run dev
```

✅ Backend runs at: `http://localhost:5000`
✅ Health check: `http://localhost:5000/api/health`

---

## 🖥️ Step 3 — Configure & Run Frontend

```bash
cd frontend
cp .env.example .env
```

The `.env` contains:
```env
VITE_API_BASE_URL=http://localhost:5000
```

```bash
npm install
npm run dev
```

✅ Frontend runs at: `http://localhost:5173`

---

## 🖼️ Product Images

Products are seeded with blank `image_url` values in the database.
The frontend automatically falls back to the local asset images in
`src/assets/` — so the UI will look correct out of the box.

To use your own hosted images, update the `image_url` column in Supabase:
```sql
UPDATE products SET image_url = 'https://...' WHERE name = 'Lavender Serum';
```

---

## 📡 API Endpoints

| Method | Endpoint                   | Auth | Description                    |
|--------|----------------------------|------|--------------------------------|
| GET    | `/api/health`              | No   | Health check                   |
| POST   | `/api/users/register`      | No   | Register new user              |
| POST   | `/api/users/login`         | No   | Login → returns JWT token      |
| GET    | `/api/users/me`            | Yes  | Get logged-in user profile     |
| GET    | `/api/products`            | No   | All products (?category=...)   |
| GET    | `/api/products/:id`        | No   | Single product                 |
| POST   | `/api/products`            | Yes  | Create product                 |
| PUT    | `/api/products/:id`        | Yes  | Update product                 |
| DELETE | `/api/products/:id`        | Yes  | Delete product                 |
| GET    | `/api/cart`                | Yes  | Get user's cart                |
| POST   | `/api/cart`                | Yes  | Add item to cart               |
| PUT    | `/api/cart/:cartItemId`    | Yes  | Update cart item quantity      |
| DELETE | `/api/cart/:cartItemId`    | Yes  | Remove item from cart          |
| DELETE | `/api/cart`                | Yes  | Clear entire cart              |
| POST   | `/api/orders`              | Yes  | Place order from cart          |
| GET    | `/api/orders`              | Yes  | Get all orders for user        |
| GET    | `/api/orders/:id`          | Yes  | Get single order               |

**Auth header format:** `Authorization: Bearer <token>`

---

## 🚀 Deploy

### Backend → [Render](https://render.com) / [Railway](https://railway.app)
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add all `.env` variables in the platform's environment settings

### Frontend → [Vercel](https://vercel.com) / [Netlify](https://netlify.com)
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Add env variable: `VITE_API_BASE_URL=https://your-backend-url.com`
