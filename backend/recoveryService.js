const { queryDatabase } = require('./databaseService.js');
const { sendMail } = require('./emailService.js');
const { hashCode, checkCode } = require('./hashService.js');
const { generateToken, decodedToken } = require('./jwtService.js');

async function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function searchAccountRecover(req, res) {
  if (!req.body.email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const code_recover = await generateRandomCode(6);
  try {
    const code_recover_hashed = await hashCode(code_recover);
    const results = await queryDatabase('SELECT * FROM ACCOUNTS WHERE ID_ACCOUNT = ?', [req.body.email]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuarioEncontrado = results[0];

    if (!usuarioEncontrado.STATE_ACCOUNT) {
      return res.json({ code: "1" }); // Cuenta desactivada
    }

    await queryDatabase('UPDATE ACCOUNTS SET CODE_SECURITY_HASHED = ? WHERE ID_ACCOUNT = ?', [code_recover_hashed, req.body.email]);
    await sendMail("RECUPERA TU CUENTA DE MARKETPLACE - UPTC", "recuperación", req.body.email, code_recover);
    const token = await generateToken(req.body.email, false, true);
    res.json({ code: "2", token: token });
  } catch (error) {
    console.error('Error al buscar usuario en la base de datos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function resendCodeRecovery(req, res) {
  const user = await decodedToken(req.body.token);
  if (!user) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const code_recovery = await generateRandomCode(6);
  try {
    const code_recovery_hashed = await hashCode(code_recovery);
    await queryDatabase('UPDATE ACCOUNTS SET CODE_SECURITY_HASHED=? WHERE ID_ACCOUNT=?', [code_recovery_hashed, user]);
    await sendMail("RECUPERA TU CUENTA DE MARKETPLACE - UPTC", "recuperación", user, code_recovery);
    res.json({ message: 'Activation email sent.' });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function recoverAccount(req, res) {
  if (!req.body.token || !req.body.code) {
    return res.status(400).json({ message: "Token and code are required" });
  }

  try {
    const currentUser = await decodedToken(req.body.token);
    if (!currentUser) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const results = await queryDatabase('SELECT CODE_SECURITY_HASHED FROM ACCOUNTS WHERE ID_ACCOUNT = ?', [currentUser]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { CODE_SECURITY_HASHED } = results[0];
    const isMatch = await checkCode(req.body.code, CODE_SECURITY_HASHED);

    if (isMatch) {
      const token = generateToken(currentUser, true, true);
      res.json({ code: "1", token: token });
    } else {
      const token = generateToken(currentUser, false, true);
      res.json({ code: "0", token: token });
    }
  } catch (error) {
    console.error('Error during account recovery:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { searchAccountRecover, recoverAccount, resendCodeRecovery };