const express = require('express')

const TransactionController = require('../controllers/transaction')

function initTransactionRoutes () {
  const TransactionRouter = express.Router()

  TransactionRouter.post('/', TransactionController.add)
  TransactionRouter.get('/', TransactionController.list)
  TransactionRouter.get('/:transactionId/status', TransactionController.status)

  return TransactionRouter
}

module.exports = initTransactionRoutes
