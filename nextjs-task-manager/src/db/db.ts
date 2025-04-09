import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Create a PostgreSQL client
const queryClient = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// Create the Drizzle database instance
export const db = drizzle(queryClient);