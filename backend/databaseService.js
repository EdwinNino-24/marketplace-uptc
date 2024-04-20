const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'marketplace_uptc'
});

function queryDatabase(query, params, callback) {
  connection.query(query, params, callback);
}

module.exports = { queryDatabase };