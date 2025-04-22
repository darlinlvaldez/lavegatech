import nodemailer from 'nodemailer';
import config from '../../config.js';

const emailService = {}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_SENDER,
    pass: config.EMAIL_PASSWORD
  }
});

const sendEmail = (to, subject, text) =>
  transporter.sendMail({ from: `La Vega Tech <${config.EMAIL_SENDER}>`, to, subject, text });

emailService.sendEmail = sendEmail;

emailService.sendVerification = (to, code) =>
  sendEmail(to, 'Código de verificación', `Tu código es: ${code}`);

export default emailService;