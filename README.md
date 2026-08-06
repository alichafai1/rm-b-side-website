# RM B-Side

A clean product showcase website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

No payments, checkout, or orders — just a public storefront and a simple admin dashboard for managing products.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Postgres, Auth, Storage)
- Vercel-ready deployment

## Features

- Homepage with hero, collections, products, and footer
- Product detail pages
- Secure admin login (Supabase Auth)
- Add / edit / delete products
- Product image uploads to Supabase Storage

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

Create a **new** Supabase project (do not reuse another website’s project).

### 3. Run the database schema

In the Supabase SQL editor, run:

[`supabase/schema.sql`](supabase/schema.sql)

This creates:

- `collections` and `products` tables
- Row Level Security policies
- The public `product-images` storage bucket
- Seeded collections: Essentials, Limited, Accessories

### 4. Create an admin user

In Supabase → **Authentication** → **Users** → **Add user**

Use email/password. This is the account for `/admin/login`.

### 5. Configure environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Fill in values from Supabase → **Project Settings** → **API**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 6. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Project structure

```text
app/                 Public pages + admin routes
actions/             Server actions (auth + product CRUD)
components/          UI for site, products, and admin
lib/                 Types, content, data helpers, Supabase clients
supabase/schema.sql  Database + storage setup
```

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add the same environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy.
5. In Supabase Auth settings, add your Vercel URL to allowed redirect / site URLs if prompted.
6. Smoke-test:
   - Homepage loads collections/products
   - Admin login works
   - Create a product with an image

## Content edits

Brand copy, hero text, and footer contact live in [`lib/content.ts`](lib/content.ts).

## Notes

- Prices display in USD.
- Collections are seeded in SQL and chosen from a dropdown in admin.
- Only authenticated users can create, update, or delete products (enforced by RLS).
