import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'darlinlvaldez@gmail.com',
      pass: 'darlin2000',
    },
  });

  const mailOptions = {
    from: '"La Vega Tech" <darlinlvaldez@gmail.com>',
    to,
    subject: 'Código de verificación',
    html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`,
  };

  await transporter.sendMail(mailOptions);
};
