const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'sql301.infinityfree.com',
  user: 'if0_39191602',
  password: 'V3xD3NRQS5w',
  database: 'if0_39191602_novo2'
});

module.exports = db;