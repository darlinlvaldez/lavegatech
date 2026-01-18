import session from 'express-session';
import sessionStore from '../database/sessions.js';

export default session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { secure: false, maxAge: 345600000, httpOnly: true, sameSite: 'strict'} 
});