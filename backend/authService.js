const jwt = require('jsonwebtoken');
const { queryDatabase } = require('./databaseService.js');
const secretKey = '2404';

function login(username, password, callback) {
  const query = 'SELECT * FROM USERS WHERE ID_USER = ?';
  queryDatabase(query, [username], (error, results, fields) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      if (user.PASSWORD_USER === password) {
        const token = jwt.sign({ username: user.ID_USER, activate: user }, secretKey);
        callback(null, { user: user.ID_USER, token: token, code: '0' });
      } else {
        callback(null, { user: user.ID_USER, token: null, code: '1' });
      }
    } else {
      callback(null, { user: null, token: null, code: '2' });
    }
  });
}

module.exports = { login }; 