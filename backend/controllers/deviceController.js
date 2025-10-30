const deviceService = require('../services/deviceService');
const { toPublicDevice } = require('../dtos/device.dto');

async function registerDevice(req, res) {
  try {
    const userId = req.user.sub;
    const { device_id, device_info } = req.body;

    if (!device_id) return res.status(400).json({ message: 'Device ID required' });

    await deviceService.registerDevice(userId, device_id, device_info || '');
    res.json({ message: 'Device registered successfully. Await admin verification.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function listMyDevices(req, res) {
  try {
    const userId = req.user.sub;
    const devices = await deviceService.getDevicesByUser(userId);
    res.json(devices.map(toPublicDevice));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function listUnverified(req, res) {
  try {
    const devices = await deviceService.getUnverifiedDevices();
    res.json(devices.map(toPublicDevice));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function verifyDevice(req, res) {
  try {
    const adminId = req.user.sub;
    const deviceId = req.params.id;
    await deviceService.verifyDevice(deviceId, adminId);
    res.json({ message: 'Device verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getMyDevices(req, res) {
  try {
    const userId = req.user.sub;
    const devices = await deviceService.getDevicesByUser(userId);
    const formatted = devices.map(d => ({
      ...d,
      verified: d.verified === true || d.verified === 1 || d.verified === "1"
    }));
    res.json({ devices: formatted.map(toPublicDevice) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = { registerDevice, listMyDevices, listUnverified, verifyDevice, getMyDevices };
