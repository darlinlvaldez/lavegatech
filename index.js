// Dependencias
import express from 'express';
import fileUpload from "express-fileupload";
import path from 'path';
import config from './config.js'; 

// Middleware
import {isAuth, isAdmin} from './src/middlewares/auth.js';
import session from './src/middlewares/session.js';
import { userLocals, adminLocals } from './src/middlewares/userLocals.js';

// Routes
import store from './src/routes/product.js';
import auth from './src/routes/auth.js';
import userProfile from './src/routes/userProfile.js';  
import cart from './src/routes/cart.js';
import fav from './src/routes/fav.js';
import orders from './src/routes/orders.js';
import rating from './src/routes/rating.js';
import comparison from './src/routes/comparison.js'; 
import admin from './src/routes/admin.js';
import adminAuth from './src/routes/adminAuth.js';

const app = express();

app.use(express.json());

app.use(session);

app.use(userLocals);

app.use(adminLocals);

app.use(fileUpload({}));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.use(express.static(path.join(process.cwd(), 'public')));

app.disable('x-powered-by');

app.use('/api/auth', auth); 

app.use('/api/admin', admin);

app.use('/api/adminAuth', adminAuth);

app.use('/user', userProfile); 

app.use('/cart', cart);

app.use('/fav', fav);

app.use('/api/order', orders);

app.use('/api/ratings', rating);

app.use('/comparison', comparison);

app.use('/', store);

app.post('/mant', async (req, res) => {
  const file = req.files.foto;
  await file.mv(file.name);
  res.status(200).send('ok');
});

app.get('/account', isAuth(), (req, res) => {
  res.render('profile/account', { user: req.session.user, error: null, email: null });
});

app.get('/login', isAuth({ redirect: true }), (req, res) => {
  res.render('login/login', {error: null, email: null, validationErrors: {}});
});

app.get('/register', isAuth({ redirect: true }), (req, res) => {
  res.render('login/register', {error: null, email: '', username: '', validationErrors: {}});
});

app.get('/email', (req, res) => {
  res.render('login/forgotPass/email', { error: null, email: null, validationErrors: {}});
});

app.get('/newpass', (req, res) => {
  res.render('login/forgotPass/newpass', { error: null, email: null, validationErrors: {}});
});

app.get('/verify', (req, res) => {
  const { email, type, error } = req.query;

  if (!email || !type) return res.redirect('/login');

  res.render('login/verify', {email, type, error: error || null,
    validationErrors: {}, cooldown: 0});
});

app.get('/mant', (req, res) => {
  const data = { nombre: "iphone"}
  res.render('store/mant', data);
});

app.get('/contact', (req, res) => {
  res.render('store/contact', {nombre: '', email: '', mensaje: '', asunto: '', 
    error: [], success: false, validationErrors: {}, query: req.query});
});

app.get('/about', (req, res) => {
  res.render('store/about');  
});

app.get('/order', isAuth(), (req, res) => {
  res.render('store/order');  
});

app.get('/comparison', (req, res) => {
  res.render('comparison/comparison');  
});

app.get('/conditions', (req, res) => {
  res.render('information/conditions');  
});

app.get('/warranty', (req, res) => {
  res.render('information/warranty');  
});

app.get('/productos', isAdmin(), (req, res) => {
  res.render('admin/productos');  
});

app.get('/usuarios', isAdmin(), (req, res) => {
  res.render('admin/usuarios');  
});

app.get('/variantes', isAdmin(), (req, res) => {
  res.render('admin/variantes');  
});

app.get('/admin/login', isAdmin({ redirect: true }), (req, res) => {
  res.render('admin/login', { error: null, username: null, validationErrors: {} });
});

app.get('/admin/accounts', isAdmin(), (req, res) => {
  res.render('admin/accounts');
});

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
});