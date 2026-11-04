import dotenv from "dotenv";
import { z } from "zod";

const nodeEnv = process.env.NODE_ENV ?? "development";

dotenv.config({
  path: nodeEnv === "production" ? ".env" : ".env.dev",
  quiet: true,
});

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().min(1),
});

const parsed = schema.safeParse({ ...process.env, NODE_ENV: nodeEnv });

if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    z.flattenError(parsed.error).fieldErrors,
  );
  process.exit(1);
}

export const env = parsed.data;
