const crypto = require('crypto')

const HASH_ALGO = 'sha512'
const HASH_LENGTH = 64
const HASH_ITERATION = 1000

function createHash (string, salt) {
  return crypto.pbkdf2Sync(
    string,
    salt,
    HASH_ITERATION,
    HASH_LENGTH,
    HASH_ALGO
  ).toString('hex')
}

module.exports = { createHash }
