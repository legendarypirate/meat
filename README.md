# Бурхант (Meat)

Monorepo for the Бурхант meat shop platform.

| Folder | Description | Port |
|--------|-------------|------|
| `meat/` | Next.js storefront | 3000 |
| `server/` | Express + Sequelize API | 3001 |
| `meatadmin/` | Next.js admin panel | 3002 |

## Setup

### 1. API (`server/`)

```bash
cd server
cp .env.example .env   # add DB + Cloudinary credentials
npm install
npm run db:sync
npm run db:seed
npm run dev
```

### 2. Admin (`meatadmin/`)

```bash
cd meatadmin
cp .env.example .env.local
npm install
npm run dev
```

### 3. Storefront (`meat/`)

```bash
cd meat
npm install
npm run dev
```

## Environment

- **server/.env** — PostgreSQL, Cloudinary (`CLOUDINARY_*`)
- **meatadmin/.env.local** — `NEXT_PUBLIC_API_URL`, admin login, session secret

Do not commit real `.env` files — use the `.env.example` templates.
