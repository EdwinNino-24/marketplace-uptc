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

function insertUser(user, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('INSERT INTO USERS SET ?', user, (err, results) => {
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

function getUser(userId, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('SELECT * FROM USERS WHERE ID_USER = ?', userId, (err, results) => {
      if (err) {
        callback(err, null);
        closeConnection(() => {}); 
        return;
      }
      
      if (results.length === 0) {
        callback(new Error('Usuario no encontrado'), null);
        closeConnection(() => {}); 
        return;
      }
      
      closeConnection(err => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results[0]);
      });
    });
  });
}

function getUsers(callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('SELECT * FROM USERS', (err, results) => {
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

function updateUser(userId, userUpdated, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('UPDATE USERS SET ? WHERE ID_USER = ?', [userUpdated, userId], (err, results) => {
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

function deleteUser(userId, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('DELETE FROM USERS WHERE ID_USER = ?', userId, (err, results) => {
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

function getPassword(userId, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('SELECT PASSWORD_USER FROM USERS WHERE ID_USER = ?', userId, (err, results) => {
      if (err) {
        callback(err, null);
        closeConnection(() => {}); 
        return;
      }
      
      if (results.length === 0) {
        callback(new Error('Usuario no encontrado'), null);
        closeConnection(() => {});
        return;
      }
      
      closeConnection(err => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results[0]);
      });
    });
  });
}

function getId(userId, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('SELECT ID_USER FROM USERS WHERE ID_USER = ?', userId, (err, results) => {
      if (err) {
        callback(err, null);
        closeConnection(() => {}); 
        return;
      }
      
      if (results.length === 0) {
        closeConnection(() => {}); 
        callback(null, false);
        return;
      }
      
      closeConnection(err => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, true);
      });
    });
  });
}

function getEmail(userId, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('SELECT EMAIL_USER FROM USERS WHERE ID_USER = ?', userId, (err, results) => {
      if (err) {
        callback(err, null);
        closeConnection(() => {}); 
        return;
      }
      
      if (results.length === 0) {
        callback(new Error('Correo no encontrado'), null);
        closeConnection(() => {}); 
        return;
      }
      
      closeConnection(err => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results[0]);
      });
    });
  });
}

function updatePassword(userId, newPassword, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('UPDATE USERS SET PASSWORD_USER = ? WHERE ID_USER = ?', [newPassword, userId], (err, results) => {
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


module.exports = {
  insertUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getId,
  getEmail,
  getPassword,
  updatePassword
};
