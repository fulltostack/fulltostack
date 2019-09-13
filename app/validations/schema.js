const Joi = require('@hapi/joi')
const { wallet } = require('./extension')

function signup () {
  return Joi.object().keys({
    name: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
    description: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
  })
}

function addWallet () {
  return Joi.object().keys({
    btc_address: wallet.address().btc().required(),
    btc_balance: Joi.number().min(0).max(1000000000).precision(8).required(),
    eth_address: wallet.address().eth().required(),
    eth_balance: Joi.number().min(0).max(1000000000).precision(18).required(),
    transaction_max: Joi.number().min(0).max(1000000000).precision(18)
  })
}

module.exports = { signup, addWallet }
