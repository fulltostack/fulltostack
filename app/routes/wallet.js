const express = require('express')

const WalletController = require('../controllers/wallet')

function initWalletRoutes () {
  const WalletRouter = express.Router()

  WalletRouter.post('/', WalletController.add)

  return WalletRouter
}

module.exports = initWalletRoutes
