import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

type Database = ReturnType<typeof drizzle<typeof schema>>;

let database: Database | null = null;

function readDatabaseUrl(): string {
  const value = process.env.DATABASE_URL?.trim();
  if (!value) {
    throw new Error('DATABASE_URL is required for database access.');
  }
  return value;
}

export function getDb(): Database {
  database ??= drizzle(neon(readDatabaseUrl()), { schema });
  return database;
}

export { schema };
