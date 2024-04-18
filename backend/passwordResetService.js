import jwt from 'jsonwebtoken';
import { queryDatabase } from './databaseService.js'; 

export function enterPasswordRecover(newPassword, token, res) {
  jwt.verify(token, '2404', (err, decoded) => {
    if (err) {
      console.error('Error al decodificar el token:', err);
      res.status(400).send('Token inválido');
    } else {
      console.log('Token decodificado:', decoded);
      const username = decoded.username;
      const query = 'UPDATE USERS SET PASSWORD_USER = ? WHERE ID_USER = ?';
      queryDatabase(query, [newPassword, username], (error) => {
        if (error) {
          console.error('Error al actualizar la contraseña:', error);
          res.status(500).send('Error al actualizar la contraseña');
        } else {
          console.log('Contraseña actualizada correctamente');
          res.status(200).send('Contraseña actualizada correctamente');
        }
      });
    }
  });
}
