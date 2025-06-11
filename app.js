// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const transacoesRoutes = require('./routes/transacoes.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/transacoes', transacoesRoutes);



app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app;
