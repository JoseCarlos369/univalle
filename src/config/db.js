import pkg from 'pg';
import { config } from 'dotenv';

const { Pool } = pkg;

config(); 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;