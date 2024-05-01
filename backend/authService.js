const { queryDatabase } = require('./databaseService.js');
const { generateToken } = require('./jwtService.js');
const { checkCode } = require('./hashService.js');

// Helper function to fetch user data
async function fetchUserById(id) {
  const query = 'SELECT * FROM ACCOUNTS WHERE ID_ACCOUNT = ?';
  const results = await queryDatabase(query, [id]);
  if (results.length === 0) {
    return null;
  }
  return results[0];
}

// Helper function to validate account and password
async function validateAccount(user, password) {
  if (!user.STATE_ACCOUNT) {
    return { code: '1', message: 'Cuenta inactiva', token: generateToken(user.ID_ACCOUNT, false, user.STATE_ACCOUNT) };
  }
  const isPasswordValid = await checkCode(password, user.PASSWORD_HASHED);
  if (!isPasswordValid) {
    return { code: '2', message: 'Contraseña incorrecta', token: null };
  }
  return { code: '3', token: generateToken(user.ID_ACCOUNT, true, user.STATE_ACCOUNT) };
}

// Main login function
async function login(req, res) {
  const id = req.body.username;
  const password = req.body.password;

  if (!id || typeof id !== 'string' || !password || typeof password !== 'string') {
    return res.status(400).json({ code: '400', message: 'Datos de entrada inválidos' });
  }

  try {
    const user = await fetchUserById(id);
    if (!user) {
      return res.json({ code: '0', token: null, message: 'Usuario no encontrado' });
    }
    const validationResponse = await validateAccount(user, password);
    res.json(validationResponse);
  } catch (error) {
    console.error('Error en la consulta de base de datos:', error);
    res.status(500).json({ code: '500', message: 'Error interno del servidor. Por favor intente más tarde.' });
  }
}

module.exports = { login };