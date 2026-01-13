import express from 'express';
import { isAdmin } from '../src/middlewares/auth.js';
import sessionAdmin from '../src/middlewares/sessionAdmin.js';

import admin from '../src/routes/admin/admin.js';
import adminAuth from '../src/routes/admin/auth.js';
import specs from '../src/routes/admin/specs.js';

const router = express.Router();

router.use('/admin', sessionAdmin);
router.use('/api/admin', sessionAdmin);
router.use('/api/adminAuth', sessionAdmin);
router.use('/api/specs', sessionAdmin);

router.use('/api/admin', admin);
router.use('/api/adminAuth', adminAuth);
router.use('/api/specs', specs);

router.get('/admin/login', isAdmin({ redirect: true }), (req, res) => {
  res.render('admin/login', { error: null, username: null, validationErrors: {} });
});

router.get('/admin/sales', isAdmin(), (req, res) => {
  res.render('admin/sales');
});

router.get('/admin/allSales', isAdmin(), (req, res) => {
  res.render('admin/allSales');
});

router.get('/admin/products', isAdmin(), (req, res) => {
  res.render('admin/products');
});

router.get('/admin/users', isAdmin(), (req, res) => {
  res.render('admin/users');
});

router.get('/admin/variants', isAdmin(), (req, res) => {
  res.render('admin/variants');
});

router.get('/admin/accounts', isAdmin(), (req, res) => {
  res.render('admin/accounts', {
    currentAdminId: req.session.admin.id
  });
});

router.get('/admin/brandCategory', isAdmin(), (req, res) => {
  res.render('admin/brandCategory');
});

router.get('/admin/shipping', isAdmin(), (req, res) => {
  res.render('admin/shipping');
});

router.get('/admin/device', isAdmin(), (req, res) => {
  res.render('admin/device');
});

router.get('/admin/editMobiles', isAdmin(), (req, res) => {
  res.render('admin/editMobiles');
});

router.get('/admin/specs', isAdmin(), (req, res) => {
  res.render('admin/specs');
});

export default router;
