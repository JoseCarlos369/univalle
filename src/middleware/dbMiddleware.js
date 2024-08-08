import pool from '../config/db.js';

export const dbMiddleware = async (req, res, next) => {
  let client;
  try {
    client = await pool.connect();
    req.dbClient = client;
    await next();
  } catch (err) {
    console.error('Error al conectar a la base de datos', err);
    res.status(500).json({ error: 'Error al conectar a la base de datos' });
  } finally {
    if (client) {
      client.release();
    }
  }
};