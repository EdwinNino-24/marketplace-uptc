const { queryDatabase } = require('./databaseService.js');
const { decodedToken } = require('./jwtService.js');  // Asegúrate de que esta función extrae correctamente y maneja errores
const { hashCode } = require('./hashService.js');  // Supone que retorna una promesa

async function enterPasswordRecover(req, res) {
  try {
    // Decodificar el token para obtener información del usuario
    const user = decodedToken(req.body.token);
    const newPassword = req.body.newPassword;
    if (!user) {
      res.status(401).send('Token inválido o expirado');
      return;
    }

    console.log(user);
    console.log(newPassword);


    // Generar el hash de la nueva contraseña
    const passwordHashed = await hashCode(newPassword);

    console.log(passwordHashed);

    // Actualizar la contraseña en la base de datos
    const query = 'UPDATE ACCOUNTS SET PASSWORD_HASHED = ? WHERE ID_ACCOUNT = ?';
    await queryDatabase(query, [passwordHashed, user]);

    console.log('Contraseña actualizada correctamente');
    console.log(req.body.password);
    res.status(200).send('Contraseña actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).send('Error al actualizar la contraseña');
  }
}

module.exports = { enterPasswordRecover };