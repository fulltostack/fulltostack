const express = require('express')
const passport = require('passport')

const TransactionController = require('../controllers/transaction')

function initTransactionRoutes () {
  const TransactionRouter = express.Router()

  TransactionRouter.post('/', passport.authenticate('bearer'), TransactionController.add)
  TransactionRouter.get('/', passport.authenticate('bearer'), TransactionController.list)
  TransactionRouter.get('/:transactionId/status', passport.authenticate('bearer'), TransactionController.status)

  return TransactionRouter
}

module.exports = initTransactionRoutes
