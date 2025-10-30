const crypto = require('crypto');

function genSalt(len = 16) {
  return crypto.randomBytes(len).toString('hex'); // 32 chars
}

function sha512Hash(password, salt) {
  return crypto.createHmac('sha512', salt).update(password).digest('hex');
}

module.exports = { genSalt, sha512Hash };
