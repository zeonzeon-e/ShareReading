import pg from 'pg';

const globalForDb = globalThis as typeof globalThis & {
  shareReadingPool?: pg.Pool;
};

export function getPool(): pg.Pool {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  if (!globalForDb.shareReadingPool) {
    globalForDb.shareReadingPool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: 5000,
      query_timeout: 5000,
    });
    globalForDb.shareReadingPool.on('error', () => {
      console.error('An idle PostgreSQL connection failed');
    });
  }
  return globalForDb.shareReadingPool;
}
