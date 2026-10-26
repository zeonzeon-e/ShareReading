import pg from 'pg';

export function getPool() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  if (!globalThis.shareReadingPool) {
    globalThis.shareReadingPool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: 5000,
      query_timeout: 5000,
    });
    globalThis.shareReadingPool.on('error', () => {
      console.error('An idle PostgreSQL connection failed');
    });
  }
  return globalThis.shareReadingPool;
}
