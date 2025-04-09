import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"; // 👈 make sure this is imported

// Create a PostgreSQL client
const queryClient = postgres(process.env.DATABASE_URL!, { 
  ssl: process.env.NODE_ENV === 'production' ? "require" : false 
});

// Create the Drizzle database instance
export const db = drizzle(queryClient, { schema });