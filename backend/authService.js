const { queryDatabase } = require('./databaseService.js');
const { generateToken } = require('./jwtService.js');
const { checkCode } = require('./hashService.js');

async function login(req, res) {
  const query = 'SELECT * FROM ACCOUNTS WHERE ID_ACCOUNT = ?';
  const id = req.body.username;
  const password = req.body.password;
  console.log(password);
  console.log(id);
  try {
    const results = await queryDatabase(query, [id]);
    if (results.length > 0) {
      const user = results[0];
      if (user.STATE_ACCOUNT) {
        if (await checkCode(password, user.PASSWORD_HASHED)) {
          const token = generateToken(user.ID_ACCOUNT, true, user.STATE_ACCOUNT);
          res.json({ code: "3", token: token });
        } else {
          res.json({ code: '2', token: null });
        }
      } else {
        const token = generateToken(user.ID_ACCOUNT, false, user.STATE_ACCOUNT);
        res.json({ code: '1', token: token, message: 'Cuenta inactiva' });
      }
    } else {
      res.json({ code: '0', token: null, message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en la consulta de base de datos:', error);
    res.status(500).json({ code: '500', message: 'Error interno del servidor' });
  }
}

module.exports = { login }; 