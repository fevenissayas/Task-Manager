import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const queryClient = postgres(process.env.DATABASE_URL!, { 
  ssl: process.env.NODE_ENV === 'production' ? "require" : false 
});

export const db = drizzle(queryClient, { schema });