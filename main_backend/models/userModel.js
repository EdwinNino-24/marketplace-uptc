const { queryDatabase } = require('../utils/dbUtils.js');


exports.fetchUserById = async (id) => {
  const query = 'SELECT * FROM ACCOUNTS WHERE ID_ACCOUNT = ? LIMIT 1';
  let results = [];
  try {
    results = await queryDatabase(query, [id]);
  } catch (error) {
  }
  return results[0];
};

exports.fetchUsersById = async (id) => {
  const query = 'SELECT * FROM ACCOUNTS WHERE ID_ACCOUNT = ?;';
  let results = [];
  try {
    results = await queryDatabase(query, [id]);
  } catch (error) {
  }
  return results;
};

exports.fetchPersonalInformationById = async (id) => {
  const query = `
    SELECT
    PI.NAMES,
    PI.LASTNAMES,
    A.ID_ACCOUNT
    FROM ACCOUNTS A
    JOIN PERSONAL_INFORMATION PI ON A.ID_PERSONAL = PI.ID_PERSONAL
    WHERE ID_ACCOUNT = ? LIMIT 1;
    `;
  let results = [];
  try {
    results = await queryDatabase(query, [id]);
  } catch (error) {
  }
  return results[0];
};

exports.updatePersonalInformation = async (names, lastnames, id) => {
  const updateQuery = `
  UPDATE PERSONAL_INFORMATION PI
  JOIN ACCOUNTS A ON A.ID_PERSONAL = PI.ID_PERSONAL
  SET PI.NAMES = ?, PI.LASTNAMES = ?
  WHERE A.ID_ACCOUNT = ?;
  `;
  try {
    const result = await queryDatabase(updateQuery, [names, lastnames, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

exports.updatePassword = async (password_hashed, user) => {
  const updateQuery = `
  UPDATE ACCOUNTS
  SET PASSWORD_HASHED = ?
  WHERE ID_ACCOUNT = ?;
  `;
  try {
    const result = await queryDatabase(updateQuery, [password_hashed, user.ID_ACCOUNT]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating password:', error);
    return false;
  }
};

exports.deleteAccount = async (user) => {
  const updateQuery = `
  UPDATE ACCOUNTS
  SET STATE_ACCOUNT = FALSE
  WHERE ID_ACCOUNT = ?;
  `;
  const updatePosts = `
  UPDATE PUBLICATIONS
  SET VISIBILITY_POST = FALSE
  WHERE ID_OFFERER = ?;
  `;
  try {
    await queryDatabase(updatePosts, [user.ID_ACCOUNT]);
    const result = await queryDatabase(updateQuery, [user.ID_ACCOUNT]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating password:', error);
    return false;
  }
};