const nodemailer = require('nodemailer');

async function send_mail(to) {
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'servicemarketplaceu@gmail.com',
            pass: 'pmna eyho ijzy gmil'
        }
    }

    const codigoAutenticacion = 123456;

    const mensaje = {
        from: 'servicemarketplaceu@gmail.com',
        to: to + '@uptc.edu.co',
        subject: 'Confirma tu Cuenta de MARKETPLACE - UPTC',
        text: `Tu código de autenticación que debes ingresar es: ${codigoAutenticacion}`
    }

    const transport = nodemailer.createTransport(config);

    try {
        const info = await transport.sendMail(mensaje);
        console.log('Correo enviado:', info);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

module.exports = {
    send_mail
};

