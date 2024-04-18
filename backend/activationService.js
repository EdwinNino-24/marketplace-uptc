import { insertUser, deleteNewUser } from './userService.js';
import { queryDatabase } from './databaseService.js';

export function activateAccount(code, res) {
  queryDatabase('SELECT * FROM NEW_USERS WHERE CODE_ACTIVATION_NEW_USER = ?', code, (err, results) => {
    if (err) {
      console.error('Error al buscar usuario con el código de activación:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    if (results.length === 0) {
      console.log('Usuario no encontrado');
      res.send("¡El código que ingresaste no fue el que te enviamos!");
    } else {
      const usuarioEncontrado = results[0];
      console.log('Usuario encontrado:', usuarioEncontrado);
      
      const newUserAuth = {
        ID_NEW_USER: usuarioEncontrado.ID_NEW_USER,
        NAMES_NEW_USER: usuarioEncontrado.NAMES_NEW_USER,
        LASTNAMES_NEW_USER: usuarioEncontrado.LASTNAMES_NEW_USER,
        PASSWORD_NEW_USER: usuarioEncontrado.PASSWORD_NEW_USER,
        CODE_ACTIVATION_NEW_USER: usuarioEncontrado.CODE_ACTIVATION_NEW_USER
      };

      insertUser(newUserAuth);
      deleteNewUser(newUserAuth.ID_NEW_USER);
      res.send("¡Tu cuenta se ha creado exitosamente!");
    }
  });
}
