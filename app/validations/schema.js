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
  SIGNUP: new JoiSchema('SIGNUP', Joi.object().keys({
    name: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
    description: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
  })),
  ADD_WALLET: new JoiSchema('ADD_WALLET', Joi.object().keys({
    btc_address: wallet.address().btc().required(),
    btc_balance: Joi.number().min(0).max(1000000000).precision(8).required(),
    eth_address: wallet.address().eth().required(),
    eth_balance: Joi.number().min(0).max(1000000000).precision(18).required(),
    transaction_max: Joi.number().min(0).max(1000000000).precision(18)
  }))
}

module.exports = schemas
