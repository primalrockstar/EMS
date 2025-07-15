/**
 * Startup script for ProMedix EMS
 * Handles database initialization and graceful startup during deployment
 */

import { db } from "./db";

/**
 * Initialize database connection and verify it's working
 */
export async function initializeDatabase(): Promise<boolean> {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not found. Database operations will be limited.");
      return false;
    }

    // Check if database connection is available
    if (!db) {
      console.warn("Database connection not established. Database operations will be limited.");
      return false;
    }

    // Try a simple query to verify connection
    await db.execute('SELECT 1');
    console.log("✅ Database connection verified successfully");
    return true;
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    console.warn("Application will start but database operations will be limited.");
    return false;
  }
}

/**
 * Check if essential tables exist in the database
 */
export async function checkDatabaseTables(): Promise<boolean> {
  try {
    if (!db) {
      return false;
    }

    // Check if essential tables exist
    const tableCheck = await db.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'protocols', 'medications', 'learning_modules', 'study_notes', 'flashcards', 'nremt_questions')
    `);

    const expectedTables = ['users', 'protocols', 'medications', 'learning_modules', 'study_notes', 'flashcards', 'nremt_questions'];
    const existingTables = tableCheck.rows.map((row: any) => row.table_name);
    
    const missingTables = expectedTables.filter(table => !existingTables.includes(table));
    
    if (missingTables.length > 0) {
      console.warn(`⚠️  Missing database tables: ${missingTables.join(', ')}`);
      console.warn("Run 'npm run db:push' to create missing tables");
      return false;
    }

    console.log("✅ All required database tables exist");
    return true;
  } catch (error) {
    console.error("❌ Database table check failed:", error);
    return false;
  }
}

/**
 * Main startup function
 */
export async function startupChecks(): Promise<void> {
  console.log("🚀 Starting ProMedix EMS...");

  // Check database connection
  const dbConnected = await initializeDatabase();
  
  if (dbConnected) {
    // Check if tables exist
    const tablesExist = await checkDatabaseTables();
    
    if (!tablesExist) {
      console.log("💡 To set up the database, run:");
      console.log("   npm run db:push");
      console.log("   npm run db:seed");
    }
  } else {
    console.log("💡 To connect to database, ensure DATABASE_URL is set:");
    console.log("   export DATABASE_URL='postgresql://user:password@host:port/database'");
  }

  console.log("✅ ProMedix EMS startup complete");
}

/**
 * Database health check for monitoring
 */
export async function healthCheck(): Promise<{ database: boolean; tables: boolean }> {
  const dbConnected = await initializeDatabase();
  const tablesExist = dbConnected ? await checkDatabaseTables() : false;
  
  return {
    database: dbConnected,
    tables: tablesExist
  };
}