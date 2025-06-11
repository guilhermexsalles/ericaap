// server.js
const app = require('./app');
const dotenv = require('dotenv');

// Carrega variáveis do .env
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});