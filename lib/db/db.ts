import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

dotenv.config({ path: ".env.local" });

// Create the pool after loading environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({ client: pool });
