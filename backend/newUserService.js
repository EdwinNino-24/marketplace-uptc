const { sendMail } = require('./emailService.js');
const { queryDatabase } = require('./databaseService.js');
const { hashCode } = require('./hashService.js');
const { generateToken, decodedToken } = require('./jwtService.js');

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function handleExistingUser(account, formData, res) {
  const { names, lastnames, email } = formData;
  const { STATE_ACCOUNT, ID_PERSONAL } = account;
  if (STATE_ACCOUNT) {
    return res.json({ code: "0", message: "An account with this email already exists." });
  }
  const code_activation = generateRandomCode(6);
  const [passwordHashed, code_activation_hashed, code_recover_hashed] = await Promise.all([
    hashCode(formData.password),
    hashCode(code_activation),
    hashCode(generateRandomCode(6))
  ]);

  await queryDatabase(
    'UPDATE PERSONAL_INFORMATION SET NAMES=?, LASTNAMES=? WHERE ID_PERSONAL=?',
    [names, lastnames, ID_PERSONAL]
  );
  await queryDatabase(
    'UPDATE ACCOUNTS SET PASSWORD_HASHED=?, CODE_CONFIRMATION_HASHED=?, CODE_SECURITY_HASHED=?, UPDATE_DATE=NOW(), STATE_ACCOUNT=? WHERE ID_ACCOUNT=?',
    [passwordHashed, code_activation_hashed, code_recover_hashed, false, email]
  );

  sendMail("REACTIVA TU CUENTA DE MARKETPLACE - UPTC", "reactivación", email, code_activation);
  const token = generateToken(email, false, false);
  res.json({ user: email, token: token, message: 'Account reactivated and updated successfully.' });
}

async function insertNewUser(formData, res) {
  const { names, lastnames, email, password } = formData;
  const code_activation = generateRandomCode(6);
  const [personalInfo, passwordHashed, code_activation_hashed, code_recover_hashed] = await Promise.all([
    queryDatabase('INSERT INTO PERSONAL_INFORMATION (NAMES, LASTNAMES) VALUES (?, ?)', [names, lastnames]),
    hashCode(password),
    hashCode(code_activation),
    hashCode(generateRandomCode(6))
  ]);

  const personalId = personalInfo.insertId;
  await queryDatabase(
    'INSERT INTO ACCOUNTS (ID_ACCOUNT, ID_PERSONAL, ID_TYPE, CREATION_DATE, CODE_CONFIRMATION_HASHED, PASSWORD_HASHED, CODE_SECURITY_HASHED, UPDATE_DATE, STATE_ACCOUNT) VALUES (?, ?, ?, NOW(), ?, ?, ?, NOW(), ?)',
    [email, personalId, 2, code_activation_hashed, passwordHashed, code_recover_hashed, false]
  );

  await sendMail("ACTIVA TU CUENTA DE MARKETPLACE UPTC", "activación", email, code_activation);
  const token = generateToken(email, false, false);
  res.json({ user: email, token: token, message: 'Account successfully created.' });
}

async function createAccount(formData, res) {
  const { email } = formData;
  try {
    const accountCheck = await queryDatabase('SELECT ID_ACCOUNT, STATE_ACCOUNT, ID_PERSONAL FROM ACCOUNTS WHERE ID_ACCOUNT = ?', [email]);
    if (accountCheck.length > 0) {
      await handleExistingUser(accountCheck[0], formData, res);
    } else {
      await insertNewUser(formData, res);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
}

async function resendCodeActivation(req, res) {
  const user = decodedToken(req.body.token);
  const code_activation = generateRandomCode(6);
  try {
    const code_activation_hashed = await hashCode(code_activation);
    await queryDatabase(
      'UPDATE ACCOUNTS SET CODE_CONFIRMATION_HASHED=? WHERE ID_ACCOUNT=?',
      [code_activation_hashed, user]
    );
    await sendMail("ACTIVA TU CUENTA DE MARKETPLACE - UPTC", "activación", user, code_activation);
    res.json({ message: 'Activation email sent.' });
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
}

module.exports = { createAccount, resendCodeActivation };