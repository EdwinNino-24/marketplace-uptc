const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sac.marketplace.uptc@gmail.com',
    pass: 'elmo pzdu iahw yhad'
  }
});

async function sendMail(title, body, email, code) {
  const mailOptions = {
    from: 'sac.marketplace.uptc@gmail.com',
    to: email + '@uptc.edu.co',
    subject: title,
    text: `Tu código de ${body} es: ${code}`
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
}

module.exports = { sendMail };
