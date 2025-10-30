const express = require('express');
const router = express.Router();
const { registerDevice, listUnverified, verifyDevice, getMyDevices } = require('../controllers/deviceController');
const auth = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/roleMiddleware');

router.post('/register', auth, registerDevice);
router.get('/my', auth, getMyDevices); // ✅ Added this
router.get('/admin/unverified', auth, requireRole('admin'), listUnverified);
router.post('/admin/verify/:id', auth, requireRole('admin'), verifyDevice);

module.exports = router;
