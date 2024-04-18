import { sendMail } from './emailService.js'; 
import { queryDatabase } from './databaseService.js'; 

export function createAccount(formData, callback) {
  const { names, lastnames, email, password } = formData;
  const code = Math.floor(100000 + Math.random() * 900000);

  console.log('Nombres:', names);
  console.log('Apellidos:', lastnames);
  console.log('Correo electrónico:', email);
  console.log('Contraseña:', password);

  const newUser = {
    ID_NEW_USER: email,
    NAMES_NEW_USER: names,
    LASTNAMES_NEW_USER: lastnames,
    PASSWORD_NEW_USER: password,
    CODE_ACTIVATION_NEW_USER: code
  };

  queryDatabase('SELECT ID_USER FROM USERS WHERE ID_USER = ?', newUser.ID_NEW_USER, (error, results, fields) => {
    if (error) {
      callback('Error al verificar el ID_NEW_USER en la tabla USERS', null);
      return;
    }
    if (results.length > 0) {
      callback('¡Ya hay una cuenta registrada con el usuario institucional ingresado!', null);
      return;
    }
    queryDatabase('SELECT * FROM NEW_USERS WHERE ID_NEW_USER = ?', newUser.ID_NEW_USER, (error, results, fields) => {
      if (error) {
        callback('Error al verificar el ID_NEW_USER en la tabla NEW_USERS', null);
        return;
      }
      if (results.length > 0) {
        queryDatabase('UPDATE NEW_USERS SET NAMES_NEW_USER = ?, LASTNAMES_NEW_USER = ?, PASSWORD_NEW_USER = ?, CODE_ACTIVATION_NEW_USER = ? WHERE ID_NEW_USER = ?', [newUser.NAMES_NEW_USER, newUser.LASTNAMES_NEW_USER, newUser.PASSWORD_NEW_USER, newUser.CODE_ACTIVATION_NEW_USER, newUser.ID_NEW_USER], (error, results, fields) => {
          if (error) {
            callback('Error al actualizar el CODE_ACTIVATION_NEW_USER en la tabla NEW_USERS', null);
            return;
          }
          sendMail("ACTIVA TU CUENTA DE MARKETPLACE - UPTC", "activación", email, code); 
          console.log('El ID_NEW_USER ya existe en la tabla NEW_USERS, se ha actualizado el campo CODE_ACTIVATION_NEW_USER');
          callback(null, 'Cuenta creada exitosamente');
        });
      } else {
        queryDatabase('INSERT INTO NEW_USERS SET ?', newUser, (error, results, fields) => {
          if (error) {
            callback('Error al insertar un nuevo usuario en la tabla NEW_USERS', null);
            return;
          }
          sendMail("ACTIVA TU CUENTA DE MARKETPLACE - UPTC", "activación", email, code);
          console.log('Nuevo usuario insertado en la tabla NEW_USERS');
          callback(null, 'Cuenta creada exitosamente');
        });
      }
    });
  });
}
