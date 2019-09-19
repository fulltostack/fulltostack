const Joi = require('@hapi/joi')
const { wallet } = require('./extension')
const BadRequestError = require('../errors/badRequestError')

class JoiSchema {
  constructor (name, schema) {
    this.name = name
    this.schema = schema
  }

  async validateBody (body) {
    const { error, value } = this.schema.validate(body)
    if (error) {
      const reason = error.details[0].message.replace(new RegExp('"', 'g'), "'")
      throw new BadRequestError(reason)
    }
    return value
  }
}

const schemas = {
  SIGNUP: new JoiSchema('signup', Joi.object().keys({
    name: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
    description: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    transaction_max: Joi.number().min(0).max(1000000000).precision(18)
  })),
  SET_BTC_WALLET: new JoiSchema('btc', Joi.object().keys({
    btc_address: wallet.address().btc().required(),
    btc_balance: Joi.number().min(0).max(1000000000).precision(8).required()
  })),
  SET_ETH_WALLET: new JoiSchema('eth', Joi.object().keys({
    eth_address: wallet.address().eth().required(),
    eth_balance: Joi.number().min(0).max(1000000000).precision(18).required()
  })),
  TRANSACTION: new JoiSchema('transaction', Joi.object().keys({
    currency_amount: Joi.number().min(0).max(1000000000).precision(18).required(),
    currency_type: Joi.string().valid('BTC', 'ETH').required(),
    to_address: wallet.address().when('currency_type', [
      { is: 'BTC', then: wallet.address().btc().required() },
      { is: 'ETH', then: wallet.address().eth().required() }
    ])
  })),
  GET_TRANSACTION: new JoiSchema('get_transaction', Joi.object().keys({
    transactionId: Joi.number().required()
  }))
}

module.exports = schemas
