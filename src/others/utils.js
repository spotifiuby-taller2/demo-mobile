const crypto = require('crypto-js');

function getSHAOf(toHash) {
  return crypto.SHA256(toHash);
}

export {
  getSHAOf
}