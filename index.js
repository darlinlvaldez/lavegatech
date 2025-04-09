import express from 'express';
import fileUpload from "express-fileupload";
import path from 'path';
import mobiles from './src/routes/productos.js';
import {obtenerCategorias, obtenerProductos, obtenerRecomendados} from './src/models/principal.js';
import storeRoutes from './src/routes/productos.js';
import productRoutes from "./src/routes/productos.js";

const app = express();

app.use(fileUpload({}));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.use(express.static(path.join(process.cwd(), 'public')));

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

app.get('/mobiles/mant', (req, res) => {
  const data = { nombre: "iphone"}
  res.render('store/mant', data);
});

app.get('/', async (req, res) => {
  try {
    const productosList = await obtenerProductos();
    const categorias = await obtenerCategorias();
    const recomendados = await obtenerRecomendados();

    res.render('index', {productos: productosList, categorias, recomendados});
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).send('Error al cargar los productos.');
  }
});

app.get('/login', (req, res) => {
  res.render('login/login');  
}); 

app.get('/register', (req, res) => {
  res.render('login/register');  
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

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});