import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { dbMiddleware } from './middleware/dbMiddleware.js'; // Importar el middleware

config(); // Cargar variables de entorno

const app = express();

app.use(cors()); // Habilitar CORS para todos los orígenes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.use(dbMiddleware); // Usar el middleware de conexión a la base de datos
app.use('/api/auth', authRoutes);

export default app;