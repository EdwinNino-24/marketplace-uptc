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

function insertChat(chat, callback) {
    openConnection((err, connection) => {
      if (err) {
        callback(err, null);
        return;
      }
  
      connection.query('INSERT INTO CHATS SET ?', chat, (err, results) => {
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
  
  function getChat(idChat, callback) {
    openConnection((err, connection) => {
      if (err) {
        callback(err, null);
        return;
      }
  
      connection.query('SELECT * FROM CHATS WHERE ID_CHAT = ?', idChat, (err, results) => {
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
            callback(new Error('Chat no encontrado'), null);
            return;
          }
          callback(null, results[0]);
        });
      });
    });
  }

function getChats(callback) {
    openConnection((err, connection) => {
      if (err) {
        callback(err, null);
        return;
      }
  
      connection.query('SELECT * FROM CHATS', (err, results) => {
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

  function getChatsByIdPublication(idPublication, callback) {
    openConnection((err, connection) => {
      if (err) {
        callback(err, null);
        return;
      }
  
      connection.query('SELECT * FROM CHATS WHERE ID_PUBLICATION = ?', idPublication, (err, results) => {
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
            callback(new Error('Chat no encontrado'), null);
            return;
          }
          callback(null, results[0]);
        });
      });
    });
  }
  
  function getChatsByIdUserClient(idUserClient, callback) {
    openConnection((err, connection) => {
      if (err) {
        callback(err, null);
        return;
      }
  
      connection.query('SELECT * FROM CHATS WHERE ID_USER_CLIENT = ?', idUserClient, (err, results) => {
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
            callback(new Error('Chat no encontrado'), null);
            return;
          }
          callback(null, results[0]);
        });
      });
    });
  }
  
  module.exports = {
    insertChat,
    getChat,
    getChats,
    getChatsByIdPublication,
    getChatsByIdUserClient
  };