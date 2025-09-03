import mysql from 'mysql2/promise';
 
// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  connectionLimit: 10, // max number of connections in pool
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'mysql',
  port: 3306
});
 
// Test a connection from the pool
pool.getConnection((error, connection) => {
  if (error) {
    console.error('Pool connection error:', error);
    return;
  }
  console.log('Successfully connected to the database via pool.');
 
  connection.query('SELECT 1 + 1 AS solution', (error, results) => {
    // Release the connection back to the pool ASAP
    connection.release();
 
    if (error) {
      console.error('Query error:', error);
      return;
    }
    console.log('The solution is:', results[0].solution);
  });
});
 
 
export default pool;
 