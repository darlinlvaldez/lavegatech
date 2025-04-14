import mysql from 'mysql2/promise';
import config from '../../config.js';

const db = {
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  port: config.DB_PORT,
};

const pool = mysql.createPool(db);

pool.getConnection()
  .then((connection) => {
    connection.release();
    console.log('Conectado a MySQL');
  })
  .catch((err) => {
    console.error('Error al conectar con MySQL:', err);
  });

export default pool; 