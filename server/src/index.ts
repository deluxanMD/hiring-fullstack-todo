import { app } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

async function main() {
  await connectDb();
  app.listen(env.PORT, () => {
    console.log(
      `Server listening on http://localhost:${env.PORT} (${env.NODE_ENV})`,
    );
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
