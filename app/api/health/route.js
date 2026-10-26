import { getPool } from '../../../lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await getPool().query('SELECT 1 AS connected');
    if (rows[0]?.connected !== 1) throw new Error('Unexpected database result');
    return Response.json({ status: 'ok', database: 'connected' }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Health check failed:', error.message);
    return Response.json({ status: 'unavailable', database: 'disconnected' }, {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}
