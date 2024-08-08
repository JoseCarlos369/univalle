import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { dbMiddleware } from './middleware/dbMiddleware.js';
import setupSwagger from './config/swagger.js'; 

config(); 

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome hello world');
});

app.use(dbMiddleware); 
app.use('/api/auth', authRoutes);

setupSwagger(app);

export default app;