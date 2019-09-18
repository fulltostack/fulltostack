const express = require('express')
const passport = require('passport')

const WalletController = require('../controllers/wallet')

function initWalletRoutes () {
  const WalletRouter = express.Router()

  WalletRouter.post('/', passport.authenticate('bearer'), WalletController.add)

  return WalletRouter
}

module.exports = initWalletRoutes
