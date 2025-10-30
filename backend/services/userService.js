const pool = require('../config/db');

async function createUser(user) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, salt, role) VALUES (?,?,?,?,?)',
    [user.name, user.email, user.password_hash, user.salt, user.role || 'customer']
  );
  return { id: result.insertId, ...user };
}

async function findByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

module.exports = { createUser, findByEmail };
