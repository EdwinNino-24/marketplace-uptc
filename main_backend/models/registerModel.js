const { queryDatabase } = require('../utils/dbUtils.js');


exports.updateNewUser = async (formData, account, password_hashed, code_activation_hashed, code_recover_hashed) => {
  const updatePI = `UPDATE PERSONAL_INFORMATION SET NAMES=?, 
  LASTNAMES=? WHERE ID_PERSONAL=?;`;
  const updateA = `UPDATE ACCOUNTS SET PASSWORD_HASHED=?, 
  CODE_CONFIRMATION_HASHED=?, CODE_SECURITY_HASHED=?, 
  UPDATE_DATE=NOW(), STATE_ACCOUNT=? WHERE ID_ACCOUNT=?;`;
  try {
    const resultPI = await queryDatabase(updatePI, [formData.names, formData.lastnames, account.ID_PERSONAL]);
    const resultA = await queryDatabase(updateA, [password_hashed, code_activation_hashed, code_recover_hashed, false, account.ID_ACCOUNT]);
    return resultPI.affectedRows > 0 && resultA.affectedRows > 0;
  } catch (error) {
    console.error('Error updating new user:', error);
    return false;
  }
};

exports.registerNewUser = async (formData, password_hashed, code_activation_hashed, code_recover_hashed) => {
  const insertPI = `INSERT INTO PERSONAL_INFORMATION (NAMES, LASTNAMES) VALUES (?, ?);`;
  const insertA = `INSERT INTO ACCOUNTS (ID_ACCOUNT, ID_PERSONAL, ID_TYPE, CREATION_DATE, 
    CODE_CONFIRMATION_HASHED, PASSWORD_HASHED, CODE_SECURITY_HASHED, UPDATE_DATE, STATE_ACCOUNT) 
    VALUES (?, ?, ?, NOW(), ?, ?, ?, NOW(), ?);`;
  try {
    const resultPI = await queryDatabase(insertPI, [formData.names, formData.lastnames]);
    const insertId = resultPI.insertId;
    const resultA = await queryDatabase(insertA, [formData.email, insertId, 2, code_activation_hashed, password_hashed, code_recover_hashed, false]);
    return resultPI.affectedRows > 0 && resultA.affectedRows > 0;
  } catch (error) {
    console.error('Error register new user:', error);
    return false;
  }
};

exports.activateAccount = async (id) => {
  const queryActivate = `UPDATE ACCOUNTS SET STATE_ACCOUNT = TRUE WHERE ID_ACCOUNT = ?;`;
  try {
    const result = await queryDatabase(queryActivate, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error activate new user:', error);
    return false;
  }
};

exports.updateCode = async (id, code) => {
  const queryActivate = `UPDATE ACCOUNTS SET CODE_CONFIRMATION_HASHED = ? WHERE ID_ACCOUNT = ?;`;
  try {
    const result = await queryDatabase(queryActivate, [code, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updateCode:', error);
    return false;
  }
};