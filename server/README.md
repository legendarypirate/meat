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
npm start      # production
```

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
