const Joi = require('@hapi/joi')
const walletValidator = require('wallet-address-validator')

const wallet = Joi.extend({
  type: 'address',
  base: Joi.string(),
  rules: {
    btc: {
      validate (value, helpers) {
        if (!walletValidator.validate(value, 'btc')) {
          return helpers.error('invalid.address')
        }
        return value
      }
    },
    eth: {
      validate (value, helpers) {
        if (!walletValidator.validate(value, 'eth')) {
          return helpers.error('invalid.address')
        }
        return value
      }
    }
  },
  messages: {
    'invalid.address': 'Wallet Address is invalid'
  }
})

module.exports = { wallet }
