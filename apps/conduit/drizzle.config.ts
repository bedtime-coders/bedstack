import { defineConfig } from 'drizzle-kit';
import { env } from '@/core/env';

const dbCredentials = {
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  ssl: false,
};

export const dbCredentialsString = `postgres://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}`;

export default defineConfig({
  out: './drizzle/migrations',
  // in our codebase, 'schema' refers to TypeBox objects (abstraction of a JSON schema), while 'model' refers to database entities/tables, which is what drizzle refers to as 'schema'
  schema: '**/*.schema.ts',
  breakpoints: false,
  dialect: 'postgresql',
  dbCredentials,
  strict: true,
  // Redefine default migrations table and schema for the sake of clarity
  migrations: {
    table: '__drizzle_migrations',
    schema: 'drizzle',
  },
});
