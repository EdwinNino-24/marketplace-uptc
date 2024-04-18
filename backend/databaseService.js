import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'marketplace_uptc'
});

export function queryDatabase(query, params, callback) {
  connection.query(query, params, callback);
}