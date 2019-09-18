const { of } = require('await-of')
const { User } = require('./../models')
const { signRequest } = require('../utils')
const Responder = require('../../lib/expressResponder')
const schemas = require('./../validations/schema')
const BadRequestError = require('../errors/badRequestError')

class UserController {
  static async signup (req, res) {
    const [userDetails, error] = await of(schemas.SIGNUP.validateBody(req.body))

    if (error) {
      return Responder.operationFailed(res, error)
    }

    const userExists = await User.count({ where: { email: req.body.email } })
    if (userExists) {
      return Responder.operationFailed(res, new BadRequestError('User is already Registered!'))
    }

    const user = new User(userDetails)

    await user.save()

    Responder.created(res, { status: 'User Created' })
  }

  static async signin (req, res) {
    const token = signRequest(req.user)
    Responder.created(res, token)
  }
}

module.exports = UserController
