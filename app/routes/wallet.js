const express = require('express')
const passport = require('passport')

const schemas = require('./../validations/schema')
const WalletController = require('../controllers/wallet')

function initWalletRoutes () {
  const WalletRouter = express.Router()

  WalletRouter.post('/btc', passport.authenticate('bearer'), (req, res) => WalletController.setWallet(req, res, schemas.SET_BTC_WALLET))
  WalletRouter.post('/eth', passport.authenticate('bearer'), (req, res) => WalletController.setWallet(req, res, schemas.SET_ETH_WALLET))

  return WalletRouter
}

module.exports = initWalletRoutes
