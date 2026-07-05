import "dotenv/config";
import { Sequelize } from "sequelize";

const dialect = process.env.DB_DIALECT || "postgres";
const defaultUser = dialect === "postgres" ? "postgres" : "root";
const defaultPort = dialect === "postgres" ? 5432 : 3306;
const host = process.env.DB_HOST || "127.0.0.1";
const password =
  process.env.DB_PASSWORD != null ? String(process.env.DB_PASSWORD) : "";

const options = {
  host,
  port: Number(process.env.DB_PORT || defaultPort),
  dialect,
  logging: process.env.DB_LOGGING === "true" ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
  },
};

// Unix socket (e.g. DB_HOST=/tmp on macOS Postgres)
if (dialect === "postgres" && host.startsWith("/")) {
  delete options.port;
}

const sequelize = new Sequelize(
  process.env.DB_NAME || "meat",
  process.env.DB_USER || defaultUser,
  password,
  options,
);

export default sequelize;
