const express = require('express');
const { credit, balance, debit, listTransactions } = require('../controllers/walletController');

const router = express.Router();

router.post('/credit', credit);
router.post('/debit', debit);
router.get('/balance', balance);
router.get('/transactions', listTransactions);

module.exports = router;
