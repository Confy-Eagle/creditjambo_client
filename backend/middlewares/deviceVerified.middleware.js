const pool = require('../config/db');

module.exports = async function deviceVerified(req, res, next) {
  const userId = req.user.sub;
  const deviceId = req.headers['x-device-id'];
  if (!deviceId) return res.status(400).json({ message: 'Missing device ID in headers' });

  const [rows] = await pool.query(
    'SELECT * FROM devices WHERE user_id = ? AND device_id = ?',
    [userId, deviceId]
  );
  const device = rows[0];
  if (!device || device.is_verified === 0) {
    return res.status(403).json({ message: 'Device not verified. Contact admin.' });
  }

  next();
};
