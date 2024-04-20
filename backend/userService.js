const { queryDatabase } = require('./databaseService.js');

function insertUser(newUserAuth) {
  const newRegisterUser = {
    ID_USER: newUserAuth.ID_NEW_USER,
    CREATION_DATE_USER: new Date(),
    CODE_CONFIRMATION_USER: newUserAuth.CODE_ACTIVATION_NEW_USER,
    NAMES_USER: newUserAuth.NAMES_NEW_USER,
    LAST_NAMES_USER: newUserAuth.LASTNAMES_NEW_USER,
    EMAIL_USER: newUserAuth.ID_NEW_USER + "@uptc.edu.co",
    PASSWORD_USER: newUserAuth.PASSWORD_NEW_USER,
    CODE_SECURITY_USER: Math.floor(100000 + Math.random() * 900000)
  };

  queryDatabase('INSERT INTO USERS SET ?', newRegisterUser, (err, results) => {
    if (err) {
      console.error('Error al insertar nuevo usuario en la tabla USERS:', err);
      return;
    }
    console.log('Nuevo usuario insertado en la tabla USERS');
  });
}

function deleteNewUser(userId) {
  queryDatabase('DELETE FROM NEW_USERS WHERE ID_NEW_USER = ?', userId, (err, results) => {
    if (err) {
      console.error('Error al eliminar usuario de la tabla NEW_USERS:', err);
      return;
    }
    console.log('Usuario eliminado de la tabla NEW_USERS');
  });
}

module.exports = { insertUser, deleteNewUser };