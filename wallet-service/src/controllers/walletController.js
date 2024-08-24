const { addMoney, deductMoney, getTransactions, getWalletBalance} = require('../services/walletService');

async function credit(req, res) {
    try {
        const transaction = await addMoney(req.body.userId, req.body.amount);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function debit(req, res) {
    try {
        const transaction = await deductMoney(req.body.userId, req.body.amount);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function listTransactions(req, res) {
    try {

        const transactions = await getTransactions(req.body.userId);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function balance(req, res){
    try{
        const balance = await getWalletBalance(req.body.userId);
        res.status(200).json(balance);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

module.exports = { credit, balance, debit, listTransactions };
