// Dependencias
import express from 'express';
import fileUpload from "express-fileupload";
import path from 'path';
import cors from 'cors'
import config from './config.js';
import cookieParser from 'cookie-parser';

// Controller
import {obtenerCategorias, obtenerProductos, obtenerRecomendados} from './src/models/principal.js';

// Routes
import mobiles from './src/routes/productos.js';
import storeRoutes from './src/routes/productos.js';
import productRoutes from "./src/routes/productos.js";
import auth from './src/routes/auth.js';

const app = express();

app.use(cookieParser());

app.use(fileUpload({}));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.use(express.static(path.join(process.cwd(), 'public')));

app.disable('x-powered-by');
app.use(express.json());

app.use(cors())
    
app.use('/api/auth', auth); 

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/mobiles', mobiles);

app.use('/', storeRoutes);

app.use("/product", productRoutes);

app.post('/mobiles/mant', async (req, res) => {
  const file = req.files.foto;
  await file.mv(file.name);
  res.status(200).send('ok');
});

app.post('/mobiles/cart/add', (req, res) => {
  const { id, nombre, precio, cantidad, color, descuento, stock } = req.body;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ id, nombre, precio, cantidad, color, descuento, stock });

  localStorage.setItem('cart', JSON.stringify(cart));

  res.json({ success: true, message: "Producto agregado al carrito" });
});

app.post('/logout', async (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

app.get('/mobiles/mant', (req, res) => {
  const data = { nombre: "iphone"}
  res.render('store/mant', data);
});

app.get('/', async (req, res) => {
  try {
    const productosList = await obtenerProductos();
    const categorias = await obtenerCategorias();
    const recomendados = await obtenerRecomendados();

    res.render('index', {productos: productosList, categorias, 
      recomendados});
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).send('Error al cargar los productos.');
  }
});

app.get('/login', (req, res) => {
  res.render('login/login', { error: null, email: null });
});


app.get('/register', (req, res) => {
  res.render('login/register', {
    error: null,
    email: '',
    username: ''
  });
});


app.get('/verify', (req, res) => {
  res.render('login/verify', {
    email: req.query.email,
    error: null,
    info: null
  });
});

app.post('/api/auth/enviar-codigo', (req, res) => {
  const { email } = req.body;
  // ...lógica para enviar código...

  res.render('login/verify', { email }); // 👈 asegúrate de pasar la variable
});


app.get('/mobiles/store', (req, res) => {
  res.render('store/store')  
});

app.get('/mobiles/product', (req, res) => {
  res.render('store/product');  
});

app.get('/mobiles/contact', (req, res) => {
  res.render('store/contact');  
});

app.get('/mobiles/about', (req, res) => {
  res.render('store/about');  
});

app.get('/mobiles/order', (req, res) => {
  res.render('store/order');  
});

app.get('/mobiles/cart', (req, res) => {
  res.render('store/cart');
});

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
});