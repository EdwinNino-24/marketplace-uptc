const { queryDatabase } = require('./databaseService.js');
const { decodedToken, generateToken } = require('./jwtService.js');
const { hashCode } = require('./hashService.js');

async function enterPasswordRecover(req, res) {
  try {

    const user = await decodedToken(req.body.token);
    const newPassword = req.body.newPassword;

    if (!user) {
      return res.status(401).send('Token inválido o expirado');
    }

    if (!newPassword) {
      return res.status(400).send('Nueva contraseña requerida');
    }

    const passwordHashed = await hashCode(newPassword);

    const query = 'UPDATE ACCOUNTS SET PASSWORD_HASHED = ? WHERE ID_ACCOUNT = ?';
    await queryDatabase(query, [passwordHashed, user]);

    console.log('Contraseña actualizada correctamente');
    const token = generateToken(user, true, true);
    res.json({token: token });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = { enterPasswordRecover };