import { queryDatabase } from './databaseService.js'; 
import { sendMail } from './emailService.js';
import jwt from 'jsonwebtoken';

export function searchAccountRecover(idUser, res) {
  queryDatabase('SELECT * FROM USERS WHERE ID_USER = ?', idUser, (err, results) => {
    if (err) {
      console.error('Error al buscar usuario en la base de datos:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    if (results.length === 0) {
      console.log('Usuario no encontrado');
      res.send("0");
    } else {
      const usuarioEncontrado = results[0];
      console.log('Usuario encontrado:', usuarioEncontrado);
      res.send("1");
      sendMail("RECUPERA TU CUENTA DE MARKETPLACE - UPTC", "recuperación", usuarioEncontrado.ID_USER, usuarioEncontrado.CODE_SECURITY_USER);
    }
  });
}

export function recoverAccount(numericValue, res) {
    queryDatabase('SELECT * FROM USERS WHERE CODE_SECURITY_USER = ?', [numericValue], (error, results) => {
      if (error) {
        console.error('Error al buscar usuario en la base de datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
      }
  
      if (results.length > 0) {
        const user = results[0];
        const token = jwt.sign({ username: user.ID_USER }, '2404');
        console.log('Código de seguridad correcto');
  
        const newCode = Math.floor(100000 + Math.random() * 900000);
        console.log('Nuevo código:', newCode);
  
        queryDatabase('UPDATE USERS SET CODE_SECURITY_USER = ? WHERE ID_USER = ?', [newCode, user.ID_USER], (error, results, fields) => {
          if (error) {
            console.error('Error al actualizar código de seguridad:', error);
          }
        });
  
        res.json({ user: user.ID_USER, token: token, code: '0' });
      } else {
        console.log('Código de seguridad incorrecto');
        res.json({ user: null, token: null, code: '1' });
      }
    });
  }
