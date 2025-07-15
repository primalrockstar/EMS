// server/db.ts

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// ✅ Connect to your database using environment config
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
  // Add ssl config here if needed:
  // ssl: { rejectUnauthorized: false }
})

// 🌟 Export a fully-typed Drizzle client
export const db = drizzle(pool, { schema })

export type DB = typeof db
