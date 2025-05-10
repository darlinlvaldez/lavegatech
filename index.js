// Dependencias
import express from 'express';
import fileUpload from "express-fileupload";
import path from 'path';
import config from './config.js'; 

// Middleware
import isAuth from './src/middlewares/auth.js';
import session from './src/middlewares/session.js';
import userLocals from './src/middlewares/userLocals.js';

// Controller
import principal from './src/models/principal.js';

// Routes
import store from './src/routes/productos.js';
import auth from './src/routes/auth.js';
import userProfile from './src/routes/userProfile.js';  

const app = express();

app.use(express.json());

app.use(session);

app.use(userLocals);

app.use(fileUpload({}));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.use(express.static(path.join(process.cwd(), 'public')));

app.disable('x-powered-by');

app.use('/api/auth', auth); 

app.use('/user', userProfile);  

app.use('/', store);

app.post('/mant', async (req, res) => {
  const file = req.files.foto;
  await file.mv(file.name);
  res.status(200).send('ok');
});

app.post('/api/auth/enviar-codigo', (req, res) => {
  const { email } = req.body;
  res.render('login/verify', { email });
});

app.get('/perfil', isAuth, (req, res) => {
  res.render('perfil', { user: req.session.user });
});

app.get('/account', isAuth, (req, res) => {
  res.render('profile/account', { user: req.session.user, error: null, email: null });
});

app.get('/login', (req, res) => {
  res.render('login/login', {error: null, email: null, validationErrors: {}});
});

app.get('/register', (req, res) => {
  res.render('login/register', {error: null, email: '', username: '', validationErrors: {}});
});

app.get('/verify', (req, res) => {
  res.render('login/verify', {email: req.query.email, error: null, info: null, validationErrors: {}});
});

app.get('/email', (req, res) => {
  res.render('login/forgotPass/email', { error: null, email: null, validationErrors: {}});
});

app.get('/newpass', (req, res) => {
  res.render('login/forgotPass/newpass', { error: null, email: null, validationErrors: {}});
});

app.get('/verify', (req, res) => {
  const {email, type, error} = req.query;
  
  if (!email || !type) return res.redirect('/login');

  res.render('login/verify', {
    email, type, error: error || null, validationErrors: {} });
});

app.get('/mant', (req, res) => {
  const data = { nombre: "iphone"}
  res.render('store/mant', data);
});

app.get('/', async (req, res) => {
  try {
    const productos = await principal.obtenerProductos();
    const categorias = await principal.obtenerCategorias();
    const recomendados = await principal.obtenerRecomendados();

    res.render('index', {productos, categorias, recomendados});
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).send('Error al cargar los productos.');
  }
});

app.get('/store', (req, res) => {
  res.render('store/store')  
});

app.get('/product', (req, res) => {
  res.render('store/product');  
});

app.get('/contact', (req, res) => {
  res.render('store/contact', {nombre: '', email: '', mensaje: '', asunto: '', 
    error: [], success: false, validationErrors: {}, query: req.query});
});

app.get('/about', (req, res) => {
  res.render('store/about');  
});

app.get('/order', (req, res) => {
  res.render('store/order');  
});

app.get('/cart', (req, res) => {
  res.render('store/cart');
});

app.get('/conditions', (req, res) => {
  res.render('information/conditions');  
});

app.get('/warranty', (req, res) => {
  res.render('information/warranty');  
});

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
});