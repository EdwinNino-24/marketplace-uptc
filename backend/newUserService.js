const { sendMail } = require('./emailService.js');
const { queryDatabase } = require('./databaseService.js');
const { hashCode } = require('./hashService.js');
const jwt = require('jsonwebtoken');
const { decodedToken } = require('./jwtService.js');

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function createAccount(formData, res) {
  const { names, lastnames, email, password } = formData;
  const code_activation = generateRandomCode(6);
  const code_recover = generateRandomCode(6);

  try {
    // Await the completion of the password hashing
    const passwordHashed = await hashCode(password);
    const code_activation_hashed = await hashCode(code_activation);
    console.log(code_activation);
    const code_recover_hashed = await hashCode(code_recover);

    // Check for existing account and retrieve the personal ID
    const accountCheck = await queryDatabase('SELECT ID_ACCOUNT, STATE_ACCOUNT, ID_PERSONAL FROM ACCOUNTS WHERE ID_ACCOUNT = ?', [email]);
    if (accountCheck.length > 0) {
      const { STATE_ACCOUNT, ID_PERSONAL } = accountCheck[0];
      if (STATE_ACCOUNT) {
        console.log('An account with this email already exists.', null);
        res.json({code: "0"});
        return;
      } else {
        // Update PERSONAL_INFORMATION based on the ID_PERSONAL retrieved
        await queryDatabase('UPDATE PERSONAL_INFORMATION SET NAMES=?, LASTNAMES=? WHERE ID_PERSONAL=?', [names, lastnames, ID_PERSONAL]);

        // Update the existing inactive account in ACCOUNTS
        await queryDatabase(
          'UPDATE ACCOUNTS SET PASSWORD_HASHED=?, CODE_CONFIRMATION_HASHED=?, CODE_SECURITY_HASHED=?, UPDATE_DATE=NOW(), STATE_ACCOUNT=? WHERE ID_ACCOUNT=?',
          [passwordHashed, code_activation_hashed, code_recover_hashed, false, email]
        );
        sendMail("REACTIVA TU CUENTA DE MARKETPLACE - UPTC", "reactivación", email, code_activation, () => {
          console.log('Reactivation email sent.');
        });
        const token = jwt.sign({ username: email, sesion: false, activate: false }, '2404');
        res.json({ user: email, token: token});
        console.log(null, 'Account reactivated and updated successfully.');
        return;
      }
    }

    // Insert into PERSONAL_INFORMATION and get the insertId
    const personalInfo = await queryDatabase('INSERT INTO PERSONAL_INFORMATION (NAMES, LASTNAMES) VALUES (?, ?)', [names, lastnames]);
    const personalId = personalInfo.insertId;

    // Insert new account into ACCOUNTS
    await queryDatabase('INSERT INTO ACCOUNTS (ID_ACCOUNT, ID_PERSONAL, ID_TYPE, CREATION_DATE, CODE_CONFIRMATION_HASHED, PASSWORD_HASHED, CODE_SECURITY_HASHED, UPDATE_DATE, STATE_ACCOUNT) VALUES (?, ?, ?, NOW(), ?, ?, ?, NOW(), ?)',
      [email, personalId, 2, code_activation_hashed, passwordHashed, code_recover_hashed, false]);

    // Send activation email
    sendMail("ACTIVA TU CUENTA DE MARKETPLACE UPTC", "activación", email, code_activation, () => {
      console.log('Activation email sent.');
    });
    const token = jwt.sign({ username: email }, '2404');
    res.json({ user: email, token: token});
    console.log(null, 'Account successfully created');
  } catch (error) {
    console.log('An error occurred: ' + error.message, null);
  }
}

async function resendCodeActivation(req, res) {
  
  const user = decodedToken(req.body.token);
  const code_activation = generateRandomCode(6);
  try {
    // Await the completion of the password hashing
    const code_activation_hashed = await hashCode(code_activation);
    console.log(code_activation);

    // Check for existing account and retrieve the personal ID
    const accountCheck = await queryDatabase('SELECT ID_ACCOUNT FROM ACCOUNTS WHERE ID_ACCOUNT = ?', [user]);
    if (accountCheck.length > 0) {
      await queryDatabase(
        'UPDATE ACCOUNTS SET CODE_CONFIRMATION_HASHED=? WHERE ID_ACCOUNT=?',
        [code_activation_hashed, user]
      );
      sendMail("ACTIVA TU CUENTA DE MARKETPLACE - UPTC", "activación", user, code_activation, () => {
        console.log('Activation email sent.');
      });
    }

  } catch (error) {
    console.log('An error occurred: ' + error.message, null);
  }
}


module.exports = { createAccount, resendCodeActivation};