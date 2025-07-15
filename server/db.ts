import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Enhanced build environment detection
function isBuildEnvironment(): boolean {
  // Check various build environment indicators
  const buildIndicators = [
    // Production without DATABASE_URL
    process.env.NODE_ENV === "production" && !process.env.DATABASE_URL,
    // Build scripts
    process.argv.some(arg => arg.includes('build')),
    // CI environments
    process.env.CI === "true" && !process.env.DATABASE_URL,
    // Specific CI platforms
    process.env.GITHUB_ACTIONS === "true" && !process.env.DATABASE_URL,
    // Deployment platforms
    process.env.VERCEL === "1" && !process.env.DATABASE_URL,
    // Build scripts detection
    process.argv.some(arg => arg.includes('db:push')),
    process.argv.some(arg => arg.includes('postinstall')),
    // Build context
    process.env.npm_lifecycle_event === "build",
    process.env.npm_lifecycle_event === "postinstall"
  ];
  
  return buildIndicators.some(indicator => indicator);
}

const isBuildPhase = isBuildEnvironment();
const isDevelopment = process.env.NODE_ENV === "development";

if (!process.env.DATABASE_URL && !isBuildEnvironment() && !isDevelopment) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create a safe database connection that won't fail during build
let pool: Pool;
let db: ReturnType<typeof drizzle>;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
} else {
  // During build phase, create a dummy connection that won't be used
  console.warn("DATABASE_URL not available during build phase. Database operations will be skipped.");
  pool = null as any;
  db = null as any;
}

export { pool, db };