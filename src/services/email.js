import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // o el proveedor SMTP que prefieras
    auth: {
      user: 'darlinlvaldez@gmail.com',
      pass: 'darlin2000',
    },
  });

  const mailOptions = {
    from: '"Tu Tienda" <tucorreo@gmail.com>',
    to,
    subject: 'Código de verificación',
    html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`,
  };

  await transporter.sendMail(mailOptions);
};
