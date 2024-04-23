const { queryDatabase } = require('./databaseService.js');
const { sendMail } = require('./emailService.js');
const jwt = require('jsonwebtoken');
const { hashCode, checkCode } = require('./hashService.js');
const { decodedToken } = require('./jwtService.js');

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function searchAccountRecover(req, res) {
  const code_recover = generateRandomCode(6); // Asegúrate de que esta función existe y genera un código
  console.log(code_recover);
  try {
    const code_recover_hashed = await hashCode(code_recover); // Asegúrate de que hashCode es una función async que hashea correctamente
    const results = await queryDatabase('SELECT * FROM ACCOUNTS WHERE ID_ACCOUNT = ?', [req.body.email]); // Uso de async/await en lugar de callbacks
    if (results.length === 0) {
      console.log('Usuario no encontrado');
      res.json({ code: "0" });
      return;
    }

    const usuarioEncontrado = results[0];
    console.log('Usuario encontrado:', usuarioEncontrado);

    // Actualiza el código de seguridad hasheado en la base de datos
    await queryDatabase('UPDATE ACCOUNTS SET CODE_SECURITY_HASHED = ? WHERE ID_ACCOUNT = ?', [code_recover_hashed, req.body.email]);

    // Enviar correo con el código de recuperación (código no hasheado)
    sendMail("RECUPERA TU CUENTA DE MARKETPLACE - UPTC", "recuperación", usuarioEncontrado.ID_ACCOUNT, code_recover);

    const token = jwt.sign({ username: req.body.email, sesion: false, activate: true }, '2404');
    res.json({ user: req.body.email, token: token, code: "1" });

  } catch (error) {
    console.error('Error al buscar usuario en la base de datos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function recoverAccount(req, res) {
  try {
      // Decodificar el token y obtener información del usuario
      const currentUser = decodedToken(req.body.token); // Asegúrate de que esta función está correctamente definida y maneja errores
      console.log(currentUser);
      // Consultar la base de datos para obtener el hash del código de seguridad
      const results = await queryDatabase('SELECT CODE_SECURITY_HASHED FROM ACCOUNTS WHERE ID_ACCOUNT = ?', [currentUser]);
      console.log(results);
      if (results.length > 0) {
          const { CODE_SECURITY_HASHED } = results[0];

          // Comparar el código proporcionado con el hash almacenado utilizando bcrypt
          const isMatch = await checkCode(req.body.code, CODE_SECURITY_HASHED);

          console.log(isMatch);

          if (isMatch) {
              // Código correcto, generar nuevo token con sesión activa
              const token = jwt.sign({ username: currentUser, session: true, activate: true }, '2404');
              res.json({ user: currentUser, token: token, code: "1" });
          } else {
              // Código incorrecto, generar token con sesión no activa
              const token = jwt.sign({ username: currentUser, session: false, activate: true }, '2404');
              res.json({ user: currentUser, token: token, code: "0" });
          }
      } else {
          console.log('Usuario no encontrado');
          res.status(404).json({ message: 'Usuario no encontrado' });
      }
  } catch (error) {
      console.error('Error al buscar usuario en la base de datos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = { searchAccountRecover, recoverAccount };