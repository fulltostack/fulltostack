const _ = require('lodash')
const { of } = require('await-of')
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

    req.user.set(walletDetails)
    const update = await req.user.save()

    Responder.created(res, _.pick(update, 'email', address, balance))
  }
}

module.exports = WalletController
