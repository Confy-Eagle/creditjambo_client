const db = require('../config/db');

async function registerDevice(userId, deviceId, deviceInfo) {
  await db.query(
    'INSERT INTO devices (user_id, device_id, device_info, verified) VALUES (?, ?, ?, false)',
    [userId, deviceId, deviceInfo]
  );
}

async function getDevicesByUser(userId) {
  const [rows] = await db.query('SELECT * FROM devices WHERE user_id = ?', [userId]);
  return rows;
}

async function getUnverifiedDevices() {
  const [rows] = await db.query('SELECT * FROM devices WHERE verified = false');
  return rows;
}

async function verifyDevice(deviceId, adminId) {
  await db.query(
    'UPDATE devices SET verified = true, verified_by = ?, verified_at = NOW() WHERE id = ?',
    [adminId, deviceId]
  );
}


module.exports = {
  registerDevice,
  getDevicesByUser,
  getUnverifiedDevices,
  verifyDevice
};
