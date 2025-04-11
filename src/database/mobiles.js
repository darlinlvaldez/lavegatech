import mysql from 'mysql2/promise';
import config from '../../config.js';

console.log(config);

const db = await mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  port: config.DB_PORT,
});

console.log('Conectado a la base de datos');

export default db;
