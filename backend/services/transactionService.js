const pool = require('../config/db');

async function getBalance(userId) {
  const [rows] = await pool.query('SELECT balance FROM balances WHERE user_id = ?', [userId]);
  return rows.length ? rows[0].balance : 0;
}

async function updateBalance(userId, newBalance) {
  await pool.query(
    'INSERT INTO balances (user_id, balance) VALUES (?, ?) ON DUPLICATE KEY UPDATE balance = ?',
    [userId, newBalance, newBalance]
  );
}

async function createTransaction(userId, type, amount, balanceAfter, description = null) {
  await pool.query(
    'INSERT INTO transactions (user_id, type, amount, balance_after, description) VALUES (?,?,?,?,?)',
    [userId, type, amount, balanceAfter, description]
  );
}

async function getTransactions(userId) {
  const [rows] = await pool.query(
    'SELECT id, type, amount, balance_after, description, created_at FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows;
}

module.exports = { getBalance, updateBalance, createTransaction, getTransactions };
