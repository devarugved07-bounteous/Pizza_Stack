import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testSequelize } from './config/db.js';
import pizzaRoutes from './routes/pizza-routes.js';
// import pool from './config/dbconnection.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', pizzaRoutes);

// Test DB and start server
testSequelize()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to start server:', err);
  });
