const db = require('../database/db');

// Listar todas as transações
exports.getAllTransacoes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM transacoes ORDER BY data DESC');
    res.json(rows);
  } catch (err) {
    console.error('❌ ERRO ao buscar transações:', err.message);
    res.status(500).json({ error: 'Erro ao buscar transações', detalhe: err.message });
  }
};

// Criar nova transação
exports.createTransacao = async (req, res) => {
  const { descricao, valor, tipo, data } = req.body;

  try {
    const query = 'INSERT INTO transacoes (descricao, valor, tipo, data) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [descricao, valor, tipo, data]);

    res.status(201).json({ id: result.insertId, descricao, valor, tipo, data });
  } catch (err) {
    console.error('❌ ERRO ao criar transação:', err);
    res.status(500).json({ error: 'Erro ao criar transação', details: err.message });
  }
};

// Deletar uma transação por ID
exports.deleteTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM transacoes WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    res.status(204).send(); // Sucesso, sem conteúdo
  } catch (err) {
    console.error('❌ ERRO ao deletar transação:', err.message);
    res.status(500).json({ error: 'Erro ao deletar transação', details: err.message });
  }
};
