const User = require('../models/userModel.js');
const Transaction = require('../models/transactionModel');

async function addMoney(userId, amount) {
    const transaction = new Transaction({ userId, amount, type: 'credit', status: 'completed' });
    await User.findByIdAndUpdate(userId, { $inc: { walletBalance: amount } });
    return await transaction.save();
}

async function deductMoney(userId, amount) {
    const user = await User.findById(userId);
    console.log(user);
    if (user.walletBalance < amount) throw new Error('Insufficient balance');

    const transaction = new Transaction({ userId, amount, type: 'debit', status: 'completed' });
    await User.findByIdAndUpdate(userId, { $inc: { walletBalance: -amount } });
    return await transaction.save();
}

async function getTransactions(userId) {
    console.log('userId:', userId);
    return await Transaction.find({ userId });
}

async function getWalletBalance(userId){
    const user = await User.findById(userId);
    
    return {"email": user.email, "walletBalance": user.walletBalance};

}

module.exports = { addMoney, deductMoney, getTransactions, getWalletBalance };
