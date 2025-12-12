// Dependencias
import express from 'express';
import fileUpload from "express-fileupload";
import path from 'path';
import config from './config.js'; 

// Middleware
import {isAuth, isAdmin} from './src/middlewares/auth.js';
import session from './src/middlewares/session.js';
import sessionAdmin from './src/middlewares/sessionAdmin.js';
import { userLocals, adminLocals } from './src/middlewares/userLocals.js';

// Routes
import store from './src/routes/store/product.js';
import auth from './src/routes/store/auth.js';
import userProfile from './src/routes/store/userProfile.js';  
import cart from './src/routes/store/cart.js';
import fav from './src/routes/store/fav.js';
import orders from './src/routes/store/orders.js';
import rating from './src/routes/store/rating.js';
import comparison from './src/routes/store/comparison.js'; 
import admin from './src/routes/admin/admin.js';
import adminAuth from './src/routes/admin/auth.js';
import specs from './src/routes/admin/specs.js';

const app = express();

app.use(express.json());

app.use('/api/admin', sessionAdmin);
app.use('/admin', sessionAdmin);
app.use('/api/adminAuth', sessionAdmin);
app.use('/api/specs', sessionAdmin);

app.use(session);

app.use((req, res, next) => {
  res.locals.req = req;
  next();
});

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

app.use('/api/specs', specs);

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
  res.render('store/profile/account', { user: req.session.user, error: null, email: null });
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
  res.render('store/clients/contact', {nombre: '', email: '', mensaje: '', asunto: '', 
    error: [], success: false, validationErrors: {}, query: req.query});
});

app.get('/about', (req, res) => {
  res.render('store/clients/about');  
});

app.get('/order', isAuth(), (req, res) => {
  res.render('store/orders/order');  
});

app.get('/comparison', (req, res) => {
  res.render('store/clients/comparison');  
});

app.get('/conditions', (req, res) => {
  res.render('store/information/conditions');  
});

app.get('/warranty', (req, res) => {
  res.render('store/information/warranty');  
});

app.get('/admin/sales', isAdmin(), (req, res) => {
  res.render('admin/sales');  
});

app.get('/admin/allProducts', isAdmin(), (req, res) => {
  res.render('admin/allProducts');
});

app.get('/admin/products', isAdmin(), (req, res) => {
  res.render('admin/products');  
});

app.get('/admin/users', isAdmin(), (req, res) => {
  res.render('admin/users');  
});

app.get('/admin/variants', isAdmin(), (req, res) => {
  res.render('admin/variants');  
});

app.get('/admin/accounts', isAdmin(), (req, res) => {
  res.render('admin/accounts', {
    currentAdminId: req.session.admin.id
  });
});

app.get('/admin/brandCategory', isAdmin(), (req, res) => {
  res.render('admin/brandCategory');
});

app.get('/admin/shipping', isAdmin(), (req, res) => {
  res.render('admin/shipping');
}); 

app.get('/admin/device', isAdmin(), (req, res) => {
  res.render('admin/device');
});

app.get('/admin/editMobiles', isAdmin(), (req, res) => {
  res.render('admin/editMobiles');
});

app.get('/admin/specs', isAdmin(), (req, res) => {
  res.render('admin/specs');
}); 

app.get('/admin/login', isAdmin({ redirect: true }), (req, res) => {
  res.render('admin/login', { error: null, username: null, validationErrors: {} });
});

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
});