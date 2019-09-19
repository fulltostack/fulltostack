const _ = require('lodash')
const { of } = require('await-of')
const schemas = require('./../validations/schema')
const Responder = require('../../lib/expressResponder')
const BadRequestError = require('../errors/badRequestError')
const { transactionProducer } = require('./../../lib/queue')
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

    transactionProducer.push(update.id)

    Responder.created(res, response)
  }

  static async list (req, res) {
    const page = req.query.page || 1
    const count = req.query.count || 10
    const offset = (page - 1) * count
    const limit = offset + count
    const where = Sequelize.or({ source_user_id: req.user.id }, { target_user_id: req.user.id })
    const attributes = ['id', 'state', 'currency_amount', 'currency_type', 'source_user_id', 'target_user_id']
    const include = [{
      model: User,
      attributes: ['id', 'eth_address', 'btc_address'],
      as: 'source_user'
    }, {
      model: User,
      attributes: ['id', 'eth_address', 'btc_address'],
      as: 'target_user'
    }]
    const [[rawTransactions, totalTransactions], dbError] = await of(Promise.all([
      Transaction.findAll({ where, attributes, limit, offset, include }),
      Transaction.count()
    ]))

    if (dbError) {
      return Responder.operationFailed(res, dbError)
    }

    const transactions = rawTransactions.map(transaction => {
      const walletAddress = `${transaction.currency_type.toLowerCase()}_address`
      return _.extend(
        _.pick(transaction, 'id', 'state', 'currency_amount', 'currency_type'), {
          from_address: transaction.source_user[walletAddress],
          to_address: transaction.target_user[walletAddress],
          transaction_type: transaction.source_user_id === req.user.id ? 'OUTBOUND' : 'INBOUND'
        }
      )
    })

    Responder.success(res, {
      transactions,
      page,
      max_page: Math.ceil(totalTransactions / count),
      fetched_transactions: transactions.length,
      total_transactions: totalTransactions
    })
  }

  static async status (req, res) {
    const [request, error] = await of(schemas.GET_TRANSACTION.validateBody(req.params))

    if (error) {
      return Responder.operationFailed(res, error)
    }

    const attributes = ['id', 'state', 'currency_amount', 'currency_type', 'source_user_id', 'target_user_id']
    const [transaction, dbError] = await of(Transaction.findOne({ where: { id: request.transactionId }, attributes, raw: true }))

    if (dbError) {
      return Responder.operationFailed(res, dbError)
    }

    const isSourceUser = transaction.source_user_id === req.user.id

    const otherUserId = isSourceUser ? transaction.target_user_id : transaction.source_user_id

    const walletAddressField = `${transaction.currency_type.toLowerCase()}_address`

    const [otherUser, dbUserError] = await of(User.findOne({ where: { id: otherUserId }, attributes: [walletAddressField], raw: true }))

    if (dbUserError) {
      return Responder.operationFailed(res, dbError)
    }

    if (isSourceUser) {
      transaction.from_address = req.user[walletAddressField]
      transaction.to_address = otherUser[walletAddressField]
      transaction.transaction_type = 'OUTBOUND'
    } else {
      transaction.from_address = otherUser[walletAddressField]
      transaction.to_address = req.user[walletAddressField]
      transaction.transaction_type = 'INBOUND'
    }

    delete transaction.source_user_id
    delete transaction.target_user_id

    Responder.success(res, transaction)
  }
}

module.exports = TransactionController
