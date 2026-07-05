import sequelize from "./config/database.js";
import "./models/index.js";
import seed from "./seed.js";

async function runSeed() {
  try {
    await sequelize.authenticate();
    await seed();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

runSeed();
