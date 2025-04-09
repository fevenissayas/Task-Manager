import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { parse } from "pg-connection-string"; // Helper function to parse DATABASE_URL

dotenv.config();

const dbConfig = parse(process.env.DATABASE_URL!);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: dbConfig.host!,
    port: parseInt(dbConfig.port!, 10),
    user: dbConfig.user!,
    password: dbConfig.password!,
    database: dbConfig.database!,
    ssl: false,
  },
});