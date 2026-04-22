import app from "./app";
import { logger } from "./lib/logger";
import { startScheduler } from "./scheduler";
import { pool } from "@workspace/db";

async function runMigrations() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id SERIAL PRIMARY KEY,
        profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        endpoint TEXT NOT NULL UNIQUE,
        p256dh TEXT NOT NULL,
        auth TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
      CREATE INDEX IF NOT EXISTS push_subscriptions_profile_id_idx
        ON push_subscriptions(profile_id);
      ALTER TABLE profiles ADD COLUMN IF NOT EXISTS plan_invalidated_at TIMESTAMP;
    `);
    logger.info("Startup migrations completed");
  } catch (err) {
    logger.error({ err }, "Startup migration failed");
  }
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, async (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  await runMigrations();
  startScheduler();
});
