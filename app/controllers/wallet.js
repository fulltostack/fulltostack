const _ = require('lodash')
const { of } = require('await-of')
const { User } = require('./../models')
const Responder = require('../../lib/expressResponder')
const BadRequestError = require('../errors/badRequestError')

class WalletController {
  static async setWallet (req, res, schema) {
    const [walletDetails, error] = await of(schema.validateBody(req.body))

    if (error) {
      return Responder.operationFailed(res, error)
    }

    const address = `${schema.name}_address`
    const balance = `${schema.name}_balance`

    if (req.user[address]) {
      return Responder.operationFailed(res, new BadRequestError(`User already have a ${schema.name.toUpperCase()} wallet!`))
    }

    const [walletExists, dbError] = await of(User.count({ where: { [address]: req.body[address] } }))
    if (dbError) {
      return Responder.operationFailed(res, dbError)
    }
    if (walletExists) {
      return Responder.operationFailed(res, new BadRequestError(`${schema.name.toUpperCase()} wallet ${req.body[address]} already exists!`))
    }

    req.user.set(walletDetails)
    const [update, updateError] = await of(req.user.save())

    if (updateError) {
      return Responder.operationFailed(res, updateError)
    }

    Responder.created(res, _.pick(update, 'email', address, balance))
  }
}

module.exports = WalletController
