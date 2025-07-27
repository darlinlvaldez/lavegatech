import session from 'express-session';
import sessionStore from '../database/sessions.js';
import config from '../../config.js';

export default session({
  name: 'connect.admin.sid',
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { secure: false, maxAge: 3600000, httpOnly: true, sameSite: 'strict' }
});
