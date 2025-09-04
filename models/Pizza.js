import { DataTypes } from 'sequelize';
// import sequelize from '../config/db';  
import sequelize from '../config/db.js';


const Pizza = sequelize.define('Pizza', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'pizzas',  // Your actual MySQL table name
  timestamps: false,    
});

export default Pizza;
