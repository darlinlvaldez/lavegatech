import expressMySQLSession from 'express-mysql-session';
import session from 'express-session';
import config from '../../config.js';

const MySQLStore = expressMySQLSession(session);

const sessionStore = new MySQLStore({
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
});

console.log('Store configurado:', sessionStore);

export default sessionStore;