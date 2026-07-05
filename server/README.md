# Meat API Server

Express + Sequelize backend for the Burkhant meat store. Runs on **port 3001**.

## Structure

```
server/
├── server.js          # Entry point — starts the HTTP server
├── app.js             # Re-exports Express app (for tests)
└── src/
    ├── app.js         # Express app factory (middleware + routes)
    ├── server.js      # DB connect, sync, listen
    ├── config/
    │   └── database.js
    ├── models/
    ├── routes/
    │   ├── index.js   # Route registry
    │   ├── products.js
    │   ├── categories.js
    │   └── admin/
    ├── middleware/
    ├── data/
    ├── seed.js
    ├── sync.js
    └── seed-run.js
```

## Setup

1. Copy env file and set PostgreSQL credentials:

```bash
cp .env.example .env
```

2. Install and sync database:

```bash
npm install
npm run db:sync
```

## Run

```bash
npm run dev    # development with auto-reload
npm start      # production (uses server.js)
```

## Production (PM2)

From the `server/` directory:

```bash
npm install
cp .env.example .env   # set DB_HOST=127.0.0.1 on Linux (not /tmp)
npm run db:sync
mkdir -p logs
pm2 delete backm-api 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 logs backm-api
curl http://127.0.0.1:3001/api/health
```

**Important:** `DB_HOST=/tmp` is for macOS Postgres.app only. On Ubuntu use `DB_HOST=127.0.0.1`.

Do **not** run `pm2 start src/app.js` from the repo root — use `ecosystem.config.cjs` inside `server/` so `.env` loads correctly.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products |
| GET | `/api/products/:slug` | Product by slug |
| GET | `/api/categories` | List categories |
| GET | `/api/admin/stats` | Dashboard stats |
| GET/POST | `/api/admin/products` | Admin products |
| GET/PUT/DELETE | `/api/admin/products/:id` | Single product |
| GET/POST | `/api/admin/categories` | Admin categories |
| PUT/DELETE | `/api/admin/categories/:id` | Single category |
