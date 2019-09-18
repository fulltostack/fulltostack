const _ = require('lodash')
const { of } = require('await-of')
const { User } = require('./../models')
const { signRequest } = require('../utils')
const schemas = require('./../validations/schema')
const Responder = require('../../lib/expressResponder')
const BadRequestError = require('../errors/badRequestError')

class UserController {
  static async signup (req, res) {
    const [userDetails, error] = await of(schemas.SIGNUP.validateBody(req.body))

    if (error) {
      return Responder.operationFailed(res, error)
    }

    const [userExists, dbError] = await of(User.count({ where: { email: req.body.email } }))
    if (dbError) {
      return Responder.operationFailed(res, dbError)
    }
    if (userExists) {
      return Responder.operationFailed(res, new BadRequestError('User is already Registered!'))
    }

    const user = new User(userDetails)

    const [update, updateError] = await of(user.save())

    if (updateError) {
      return Responder.operationFailed(res, updateError)
    }

    Responder.created(res, _.pick(update, 'name', 'email'))
  }

  static async signin (req, res) {
    const token = signRequest(req.user)
    Responder.created(res, token)
  }
}

module.exports = UserController
