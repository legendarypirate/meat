import { startServer } from "./src/app.js";

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
