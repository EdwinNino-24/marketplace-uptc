const jwt = require('jsonwebtoken');

const secretKey = '2404';

function verifyToken(token, callback) {
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, decoded);
    }
  });
}

function decodedToken(token) {
  let user;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      callback(err, null);
    } else {
      user = decoded.username;
    }
  });
  return user;
}


module.exports = { verifyToken, decodedToken };