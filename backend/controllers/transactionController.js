const transactionService = require('../services/transactionService');
const { toPublicTransaction } = require('../dtos/transaction.dto'); // ✅ added DTO import

async function deposit(req, res) {
  try {
    const userId = req.user.sub;
    const { amount, description } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    const current = await transactionService.getBalance(userId);
    const newBalance = parseFloat(current) + parseFloat(amount);

    await transactionService.createTransaction(userId, 'deposit', amount, newBalance, description);
    await transactionService.updateBalance(userId, newBalance);

    res.json({ message: 'Deposit successful', balance: newBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function withdraw(req, res) {
  try {
    const userId = req.user.sub;
    const { amount, description } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    const current = await transactionService.getBalance(userId);
    if (amount > current) return res.status(400).json({ message: 'Insufficient funds' });

    const newBalance = parseFloat(current) - parseFloat(amount);

    await transactionService.createTransaction(userId, 'withdraw', amount, newBalance, description);
    await transactionService.updateBalance(userId, newBalance);

    res.json({ message: 'Withdrawal successful', balance: newBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getBalance(req, res) {
  try {
    const userId = req.user.sub;
    const balance = await transactionService.getBalance(userId);
    res.json({ balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getHistory(req, res) {
  try {
    const userId = req.user.sub;
    const transactions = await transactionService.getTransactions(userId);
    // ✅ Use DTO to sanitize each transaction
    res.json({ transactions: transactions.map(toPublicTransaction) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { deposit, withdraw, getBalance, getHistory };
