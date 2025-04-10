import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const databaseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.DIRECT_URL
    : process.env.DATABASE_URL;
    
const queryClient = postgres(databaseUrl!, {
  ssl: true,
});

export const db = drizzle(queryClient, { schema });