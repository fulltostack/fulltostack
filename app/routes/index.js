const initUserRoutes = require('./user')
const initWalletRoutes = require('./wallet')
const initTransactionRoutes = require('./transaction')

function initRoutes (app) {
  app.use('/users', initUserRoutes())
  app.use('/wallets', initWalletRoutes())
  app.use('/transactions', initTransactionRoutes())
}

module.exports = initRoutes
