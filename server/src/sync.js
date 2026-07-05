import sequelize from "./config/database.js";
import "./models/index.js";
import seed from "./seed.js";

async function sync() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Database synced (force).");
    await seed();
    process.exit(0);
  } catch (error) {
    console.error("Sync failed:", error.message);
    process.exit(1);
  }
}

sync();
