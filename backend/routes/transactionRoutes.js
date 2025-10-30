const express = require('express');
const router = express.Router();
const { deposit, withdraw, getBalance, getHistory } = require('../controllers/transactionController');
const auth = require('../middlewares/authMiddleware');
const deviceVerified = require('../middlewares/deviceVerified.middleware'); // we’ll create this next

router.post('/deposit', auth, deviceVerified, deposit);
router.post('/withdraw', auth, deviceVerified, withdraw);
router.get('/balance', auth, deviceVerified, getBalance);
router.get('/history', auth, deviceVerified, getHistory);


module.exports = router;
