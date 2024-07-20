import { readdirSync, readFileSync } from 'fs'
import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

const schema = readFileSync('./resources/schema.sql', 'utf-8');
const seed = readFileSync('./resources/seed.sql', 'utf-8');

(async () => {
    const connector = await pool.connect();
    await connector.query(schema);
    await connector.query(seed);
    connector.release();
})();
export const runSingleQuery = async (query:string, params:any[]) => {
    const res = await pool.query(query, params);
    return res.rows;
}

export const runMultiQueries = async (query:string, params:any[]) => {
    const res = await pool.query(query, params);
    return res;
}