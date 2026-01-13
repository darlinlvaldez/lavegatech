import express from 'express';
import { isAuth } from '../src/middlewares/auth.js';

// APIs tienda
import store from '../src/routes/store/product.js';
import auth from '../src/routes/store/auth.js';
import userProfile from '../src/routes/store/userProfile.js';
import cart from '../src/routes/store/cart.js';
import fav from '../src/routes/store/fav.js';
import orders from '../src/routes/store/orders.js';
import rating from '../src/routes/store/rating.js';
import comparison from '../src/routes/store/comparison.js';

const router = express.Router();

router.use('/api/auth', auth);
router.use('/user', userProfile); 
router.use('/cart', cart);
router.use('/fav', fav);
router.use('/api/order', orders);
router.use('/api/ratings', rating);
router.use('/api/comparison', comparison);
router.use('/', store);

router.get('/account', isAuth(), (req, res) => {
  res.render('store/account', { user: req.session.user, error: null, email: null });
});

router.get('/login', isAuth({ redirect: true }), (req, res) => {
  res.render('store/login/login', { error: null, email: null, validationErrors: {} });
});

router.get('/register', isAuth({ redirect: true }), (req, res) => {
  res.render('store/login/register', {
    error: null,
    email: '',
    username: '',
    validationErrors: {}
  });
});

router.get('/email', (req, res) => {
  res.render('store/login/forgotPass/email', { error: null, email: null, validationErrors: {} });
});

router.get('/newpass', (req, res) => {
  res.render('store/login/forgotPass/newpass', { error: null, email: null, validationErrors: {} });
});

router.get('/order', isAuth(), (req, res) => {
  res.render('store/orders/order');
});

router.get('/comparison', (req, res) => {
  res.render('store/comparison');
});

router.get('/about', (req, res) => {
  res.render('store/information/about');
});

router.get('/contact', (req, res) => {
  res.render('store/information/contact', {
    name: '',
    email: '',
    message: '',
    affair: '',
    error: [],
    success: false,
    validationErrors: {},
    query: req.query
  });
});

router.get('/conditions', (req, res) => {
  res.render('store/information/conditions');
});

router.get('/warranty', (req, res) => {
  res.render('store/information/warranty');
});

export default router;