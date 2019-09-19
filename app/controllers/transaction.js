const _ = require('lodash')
const { of } = require('await-of')
const schemas = require('./../validations/schema')
const Responder = require('../../lib/expressResponder')
const BadRequestError = require('../errors/badRequestError')
const { User, Transaction, Sequelize } = require('./../models')

class TransactionController {
  static async add (req, res) {
    const [request, error] = await of(schemas.TRANSACTION.validateBody(req.body))

    if (error) {
      return Responder.operationFailed(res, error)
    }

    const address = `${request.currency_type.toLowerCase()}_address`

    if (!req.user[address]) {
      return Responder.operationFailed(res, new BadRequestError(`User do not have ${request.currency_type} account!`))
    }

    if (req.user[address] === request.to_address) {
      return Responder.operationFailed(res, new BadRequestError('Cannot initiate a transfer in own account!'))
    }

    if (req.user.transaction_max < request.currency_amount) {
      return Responder.operationFailed(res, new BadRequestError(`Transaction amount cannot be greater than ${req.user.transaction_max}!`))
    }

    const [recipient, dbError] = await of(User.findOne({ where: { [address]: request.to_address }, attributes: ['id', 'transaction_max'], raw: true }))

    if (dbError) {
      return Responder.operationFailed(res, dbError)
    }

    if (!recipient) {
      return Responder.operationFailed(res, new BadRequestError(`Invalid user for 'to' address ${request.to_address}!`))
    }

    if (recipient.transaction_max < request.currency_amount) {
      return Responder.operationFailed(res, new BadRequestError('Transaction amount is too much for recipient'))
    }

    const transactionDetails = {
      currency_amount: request.currency_amount,
      currency_type: request.currency_type,
      source_user_id: req.user.id,
      target_user_id: recipient.id
    }

    const transaction = new Transaction(transactionDetails)

    const [update, updateError] = await of(transaction.save())

    if (updateError) {
      return Responder.operationFailed(res, updateError)
    }

    const response = _.extend(
      { transaction_id: update.id, state: update.state, from_address: req.user[address] },
      _.pick(req.body, 'to_address', 'currency_amount')
    )

    Responder.created(res, response)
  }

  static async list (req, res) {
    const page = req.query.page || 1
    const count = req.query.count || 10
    const offset = (page - 1) * count
    const limit = offset + count
    const where = Sequelize.or({ source_user_id: req.user.id }, { target_user_id: req.user.id })
    const attributes = ['id', 'currency_amount', 'currency_type', 'source_user_id', 'target_user_id', 'state']
    const [[transactions, totalTransactions], dbError] = await of(Promise.all([
      Transaction.findAll({ where, attributes, limit, offset }),
      Transaction.count()
    ]))

    if (dbError) {
      return Responder.operationFailed(res, dbError)
    }

    Responder.success(res, {
      transactions,
      page,
      max_page: Math.ceil(totalTransactions / count),
      fetched_transactions: transactions.length,
      total_transactions: totalTransactions
    })
  }

  static async status (req, res) {
    Responder.success(res, 'Transaction Status')
  }
}

module.exports = TransactionController
