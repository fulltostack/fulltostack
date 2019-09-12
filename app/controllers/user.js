const Responder = require('../../lib/expressResponder')
const validations = require('./../validations/schema')
const BadRequestError = require('../errors/badRequestError')
const { User } = require('./../models')

class UserController {
  static async signup (req, res) {
    const schema = validations.signup()
    const { error, value } = schema.validate(req.body)

    const userDetails = value

    if (error) {
      const reason = error.details[0].message.replace(new RegExp('"', 'g'), "'")
      return Responder.operationFailed(res, new BadRequestError(reason))
    }

    const userExists = await User.count({ where: { email: req.body.email } })
    if (userExists) {
      return Responder.operationFailed(res, new BadRequestError('User is already Registered!'))
    }

    const user = new User(userDetails)

    await user.save()

    Responder.created(res, { status: 'User Created' })
  }
}

module.exports = UserController
