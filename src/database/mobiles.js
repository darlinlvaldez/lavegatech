import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mobiles'
});

console.log('Conectado a la base de datos db');

export default db;