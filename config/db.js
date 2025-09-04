import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'mysql',      // database name
  process.env.DB_USER || 'root',      // username
  process.env.DB_PASSWORD || 'mysql',  // password
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,          // Disable SQL logging; set to true if you want to debug
  }
);


export async function testSequelize() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    // await sequelize.sync({ alter: true });  // create/update tables if needed
    // console.log('Tables synced!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


export default sequelize;
