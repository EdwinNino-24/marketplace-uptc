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

function generateToken(email, session, activate) {
  const secretKey = '2404'; // Considera mover la clave secreta a una variable de entorno
  const token = jwt.sign({ username: email, session: session, activate: activate }, secretKey);
  return token;
}

function decodedToken(token) {
  let user;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {

    } else {
      user = decoded.username;
    }
  });
  return user;
}

function getTokenFromLocalStorage() {
  console.log(localStorage.getItem('token'));
  return localStorage.getItem('token');
};


module.exports = { verifyToken, generateToken, decodedToken, getTokenFromLocalStorage };