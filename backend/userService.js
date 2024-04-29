const { queryDatabase } = require('./databaseService.js');
const { decodedToken, decodedTokenComplete } = require('./jwtService.js');
const { hashCode, checkCode } = require('./hashService.js');

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

async function getUser(req, res) {
  const token = req.body.token;
  const user = decodedToken(token);
  const query = `
    SELECT
            PI.NAMES,
            PI.LASTNAMES,
            A.ID_ACCOUNT
        FROM ACCOUNTS A
        JOIN PERSONAL_INFORMATION PI ON A.ID_PERSONAL = PI.ID_PERSONAL
        WHERE ID_ACCOUNT = ?;
    `;
  const results = await queryDatabase(query, [user]);
  console.log(results);
  res.json(results[0]);
}

async function updatePersonalInformation(req, res) {
  const token = req.body.token;
  if (!token) {
    return res.status(400).send({ error: "Token no proporcionado" });
  }

  try {
    const user = decodedToken(token);
    const { names, lastnames } = req.body;
    if (!names || !lastnames) {
      return res.status(400).send({ error: "Nombres y apellidos son requeridos" });
    }

    // Preparamos la consulta SQL para actualizar la información
    const updateQuery = `
            UPDATE PERSONAL_INFORMATION PI
            JOIN ACCOUNTS A ON A.ID_PERSONAL = PI.ID_PERSONAL
            SET PI.NAMES = ?, PI.LASTNAMES = ?
            WHERE A.ID_ACCOUNT = ?;
        `;
    console.log(user);
    // Ejecutamos la actualización
    await queryDatabase(updateQuery, [names, lastnames, user]);
    console.log(user);

    res.json({ code: 0 });
    // Devolvemos una respuesta exitosa
  } catch (error) {
    console.error('Error al actualizar la información personal:', error);
    res.status(500).send({ error: "Error al procesar la solicitud" });
  }
}

async function updatePassword(req, res) {
  const token = req.body.token;
  if (!token) {
    return res.status(400).send({ error: "Token no proporcionado" });
  }
  try {

    const { current_password, new_password } = req.body;
    const query = 'SELECT * FROM ACCOUNTS WHERE ID_ACCOUNT = ?';
    const id = decodedToken(token);

    try {
      const results = await queryDatabase(query, [id]);

      if (results.length > 0) {

        user = results[0];
        if (await checkCode(current_password, user.PASSWORD_HASHED)) {

          new_password_hashed = await hashCode(new_password);
          const updateQuery = `
            UPDATE ACCOUNTS
            SET PASSWORD_HASHED = ?
            WHERE ID_ACCOUNT = ?;
        `;

          await queryDatabase(updateQuery, [new_password_hashed, id]);

          res.json({ code: 1 });

        }
        else{
          res.json({ code: 0});
        }
      }
    } catch (error) {
      console.error('Error en la consulta de base de datos:', error);
      res.status(500).json({ code: '500', message: 'Error interno del servidor' });
    }


  } catch (error) {
    console.error('Error al actualizar la información personal:', error);
    res.status(500).send({ error: "Error al procesar la solicitud" });
  }
}

async function validateUser(req, res) {

  const token = req.body.token;
  if (!token) {
    return res.status(400).send({ error: "Token no proporcionado" });
  }

  try {
    // Asegúrate de usar `await` aquí para esperar el resultado de la promesa
    const isValid = await decodedTokenComplete(token);

    res.json({ isValid: isValid });  // Enviar respuesta como objeto

  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error al verificar el token" });
  }

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

module.exports = { insertUser, getUser, validateUser, updatePersonalInformation, updatePassword, deleteNewUser };