const crypto = require('crypto')
const jwt = require('jsonwebtoken')

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

function signRequest (request, expiresIn = 30 * 60) {
  return {
    token: jwt.sign(request, process.env.JWT_SECRET, { expiresIn }),
    expiresIn
  }
}

async function validateToken (token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

function decodeToken (token) {
  return jwt.decode(token)
}

module.exports = { createHash, signRequest, validateToken, decodeToken }
