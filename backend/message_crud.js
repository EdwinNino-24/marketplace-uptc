const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'marketplace_uptc'
});

function openConnection(callback) {
  connection.connect(err => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

function closeConnection(callback) {
  connection.end(err => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

function insertMessage(message, callback) {
    openConnection((err, connection) => {
      if (err) {
        callback(err, null);
        return;
      }
  
      connection.query('INSERT INTO MESSAGES SET ?', message, (err, results) => {
        if (err) {
          closeConnection(connection, () => {});
          callback(err, null);
          return;
        }
  
        closeConnection(connection, (err) => {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, results);
        });
      });
    });
  }
  
  function getMessages(idChat, callback) {
    openConnection((err, connection) => {
      if (err) {
        callback(err, null);
        return;
      }
  
      connection.query('SELECT * FROM MESSAGES WHERE ID_CHAT = ?', idChat, (err, results) => {
        if (err) {
          closeConnection(connection, () => {});
          callback(err, null);
          return;
        }
  
        closeConnection(connection, (err) => {
          if (err) {
            callback(err, null);
            return;
          }
          if (results.length === 0) {
            callback(new Error('Mensaje no encontrado'), null);
            return;
          }
          callback(null, results[0]);
        });
      });
    });
  }
  


module.exports = {
    insertMessage,
    getMessages
};