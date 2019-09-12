const Responder = require('../../lib/expressResponder')

class TransactionController {
  static async add (req, res) {
    Responder.created(res, 'Transaction Created')
  }

  static async list (req, res) {
    Responder.success(res, 'Transaction History')
  }

  static async status (req, res) {
    Responder.success(res, 'Transaction Status')
  }
}

module.exports = TransactionController
