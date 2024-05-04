const { queryDatabase } = require('../utils/dbUtils.js');

exports.updateCode = async (id, code) => {
  const queryActivate = `UPDATE ACCOUNTS SET CODE_SECURITY_HASHED = ? WHERE ID_ACCOUNT = ?;`;

  try {
    const result = await queryDatabase(queryActivate, [code, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updateCode:', error);
    return false;
  }
};