import mysql from 'mysql2/promise';
import config from '../../config.js';

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  port: config.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.on('connection', (connection) => {
  connection
    .promise()
    .query(`
      SET SESSION sql_mode =
      'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'
    `)
    .catch(err => {
      console.error('Error setting sql_mode:', err);
    });
});

pool.getConnection()
  .then((connection) => {
    connection.release();
    console.log('Conectado a MySQL');
  })
  .catch((err) => {
    console.error('Error al conectar con MySQL:', err);
  });

export default pool;
