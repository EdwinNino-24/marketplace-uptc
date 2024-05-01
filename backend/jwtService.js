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

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

async function decodedTokenComplete(token) {
  try {
    const decoded = await verifyToken(token);
    return decoded.session && decoded.activate;
  } catch (err) {
    console.error("Error verifying token:", err);
    return false;
  }
}

function getTokenFromLocalStorage() {
  console.log(localStorage.getItem('token'));
  return localStorage.getItem('token');
};


module.exports = { verifyToken, generateToken, decodedToken, decodedTokenComplete, getTokenFromLocalStorage };