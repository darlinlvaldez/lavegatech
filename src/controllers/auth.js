import db from '../database/mobiles.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'darlinlvaldez@gmail.com',
    pass: 'stkj cxpx vveb mcon'
  }
});

const generateCode = () => crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 dígitos

export const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    const [existing] = await db.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
  
    if (existing.length) {
      const user = existing[0];
  
      if (!user.is_verified) {
        // Si el usuario existe pero no está verificado, redirigir a verificación
        return res.redirect(`/verify?email=${email}`);
      }
  
      // Si ya está verificado, mostrar el mensaje en la vista de registro
      return res.render('login/register', {
        error: 'Este correo ya está registrado.',
        email,
        username
      });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateCode();
  
    await db.query(
      `INSERT INTO usuarios (username, email, password, is_verified, verification_code) VALUES (?, ?, ?, 0, ?)`,
      [username, email, hashedPassword, verificationCode]
    );
  
    await transporter.sendMail({
      from: 'Tu Tienda <tucorreo@gmail.com>',
      to: email,
      subject: 'Verificación de correo',
      text: `Tu código de verificación es: ${verificationCode}`
    });
  
    res.redirect(`/verify?email=${email}`);
  };
  
  
export const showVerificationForm = (req, res) => {
  const { email } = req.query;
  res.render('login/verificar', { email });
};

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  const [result] = await db.query(`SELECT verification_code FROM usuarios WHERE email = ?`, [email]);
  if (!result.length || result[0].verification_code !== code)
    return res.status(400).render('login/verificar', { email, error: 'Código inválido.' });

  await db.query(`UPDATE usuarios SET is_verified = 1, verification_code = NULL WHERE email = ?`, [email]);
  res.redirect('/login');
};

export const resendCode = async (req, res) => {
    const { email } = req.body;
    const newCode = generateCode();
  
    await db.query(`UPDATE usuarios SET verification_code = ? WHERE email = ?`, [newCode, email]);
  
    await transporter.sendMail({
      from: 'Tu Tienda <tucorreo@gmail.com>',
      to: email,
      subject: 'Nuevo código de verificación',
      text: `Tu nuevo código es: ${newCode}`
    });
  
    res.redirect(`/verify?email=${email}&info=reenviado`);
  };
  

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    const [rows] = await db.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
    if (!rows.length) {
      return res.render('login/login', { error: 'Correo no registrado', email });
    }
  
    const user = rows[0];
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login/login', { error: 'Contraseña incorrecta', email });
    }
  
    if (!user.is_verified) {
      return res.render('login/login', { error: 'Primero debes verificar tu correo', email });
    }
  
    // Si todo está bien, redirige al home
    return res.redirect('/');
  };
  