import jwt from 'jsonwebtoken';

const secretKey = '2404';

export function verifyToken(token, callback) {
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, decoded);
    }
  });
}