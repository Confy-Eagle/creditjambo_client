const { genSalt, sha512Hash } = require('../utils/crypto');
const { sign } = require('../utils/jwt');
const userService = require('../services/userService');
const { toPublicUser } = require('../dtos/user.dto'); // ✅ added DTO import

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Missing fields' });

    const existing = await userService.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const salt = genSalt();
    const password_hash = sha512Hash(password, salt);

    const user = await userService.createUser({ name, email, password_hash, salt });

    // ✅ Use DTO to sanitize response
    res.status(201).json({
      message: 'Registered successfully. Please wait for device verification.',
      user: toPublicUser(user)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const hashed = sha512Hash(password, user.salt);
    if (hashed !== user.password_hash)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = sign({ sub: user.id, role: user.role });

    // ✅ DTO to filter out sensitive info
    res.json({ token, user: toPublicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { register, login };
