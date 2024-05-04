const mysql = require('mysql');
const util = require('util');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'marketplace_uptc'
});

const query = util.promisify(connection.query).bind(connection);

function queryDatabase(sql, params) {
  return query(sql, params);
}

module.exports = { queryDatabase };