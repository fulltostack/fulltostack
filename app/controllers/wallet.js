const Responder = require('../../lib/expressResponder')

class WalletController {
  static async add (req, res) {
    Responder.created(res, 'Wallet Created')
  }
}

module.exports = WalletController
