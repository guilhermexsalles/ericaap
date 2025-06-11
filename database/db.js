const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'db4free.net',
  user: 'bancotestepro12',
  password: '3RFVW3zL*$MT2f4',
  database: 'bancotestepro12'
});

module.exports = db;
