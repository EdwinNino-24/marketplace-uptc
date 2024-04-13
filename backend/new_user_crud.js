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

function insertNewUser(user, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('INSERT INTO NEW_USERS SET ?', user, (err, results) => {
      if (err) {
        callback(err, null);
        closeConnection(() => {}); 
        return;
      }
      
      closeConnection(err => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results);
      });
    });
  });
}