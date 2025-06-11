const express = require('express');
const router = express.Router();
const transacoesController = require('../controllers/transacoes.controller');

router.get('/', transacoesController.getAllTransacoes);
router.post('/', transacoesController.createTransacao);
router.delete('/:id', transacoesController.deleteTransacao); 

module.exports = router;
