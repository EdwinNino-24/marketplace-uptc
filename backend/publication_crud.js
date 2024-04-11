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

function insertPublication(publication, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('INSERT INTO PUBLICATIONS SET ?', publication, (err, results) => {
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

function getPublication(idPublication, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('SELECT * FROM PUBLICATIONS WHERE ID_PUBLICATION = ?', idPublication, (err, results) => {
      if (err) {
        callback(err, null);
        closeConnection(() => {}); 
        return;
      }
      
      if (results.length === 0) {
        callback(new Error('Publicación no encontrada'), null);
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

function getPublications(callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('SELECT * FROM PUBLICATIONS', (err, results) => {
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

function updatePublication(idPublication, newPublication, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('UPDATE PUBLICATIONS SET ? WHERE ID_PUBLICATION = ?', [newPublication, idPublication], (err, results) => {
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

function deletePublication(idPublication, callback) {
  openConnection(err => {
    if (err) {
      callback(err, null);
      return;
    }
    
    connection.query('DELETE FROM PUBLICATIONS WHERE ID_PUBLICATION = ?', idPublication, (err, results) => {
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
  insertPublication,
  getPublication,
  getPublications,
  updatePublication,
  deletePublication
};

