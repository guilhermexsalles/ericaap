const mysql = require('mysql2/promise');

(async () => {
  try {
    const db = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'if0_39191602_novo2'
    });

    const [rows] = await db.query('SELECT 1 + 1 AS resultado');
    console.log('✅ Conexão OK! Resultado:', rows[0].resultado);
  } catch (err) {
    console.error('❌ Erro na conexão com o banco:', err);
  }
})();
