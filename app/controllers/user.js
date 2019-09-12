const Responder = require('../../lib/expressResponder')

class UserController {
  static async signup (req, res) {
    Responder.created(res, 'User Created')
  }
}

module.exports = UserController
