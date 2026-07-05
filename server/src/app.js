import "dotenv/config";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";
import sequelize from "./config/database.js";
import "./models/index.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3002",
  "http://127.0.0.1:3002",
];

export function createApp() {
  const app = express();

  app.use(cors({ origin: allowedOrigins }));
  app.use(express.json());

  app.get("/api/health", async (_req, res) => {
    try {
      await sequelize.authenticate();
      res.json({
        status: "ok",
        database: process.env.DB_NAME || "meat",
        port: Number(process.env.PORT || 3001),
      });
    } catch (error) {
      res.status(503).json({
        status: "error",
        message: "Database connection failed",
        detail: error.message,
      });
    }
  });

  app.use("/api", routes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

export async function startServer() {
  const PORT = Number(process.env.PORT || 3001);

  await sequelize.authenticate();
  console.log(`Database "${process.env.DB_NAME || "meat"}" connected.`);

  await sequelize.sync({ alter: true });
  console.log("Models synchronized.");

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Meat API running at http://localhost:${PORT}`);
  });
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  startServer().catch((error) => {
    console.error("Failed to start server:", error.message);
    console.error(
      "Check server/.env — ensure PostgreSQL is running and database 'meat' exists.",
    );
    process.exit(1);
  });
}

export default createApp;
