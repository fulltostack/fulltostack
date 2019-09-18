const { of } = require('await-of')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const BearerStrategy = require('passport-http-bearer')

const User = require('../app/models').User
const { validateToken, decodeToken } = require('../app/utils')
const BadRequestError = require('../app/errors/badRequestError')
const AuthenticationError = require('../app/errors/authenticationError')

function initPassport () {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  passport.use(new BasicStrategy(async (email, password, done) => {
    const [user, error] = await of(User.findOne({ where: { email, password }, attributes: ['id', 'name', 'email'], raw: true }))
    if (error) {
      return done(error)
    }
    if (!user) {
      return done(new AuthenticationError('User Does Not Exist!'))
    }
    return done(null, user)
  }))

  passport.use(new BearerStrategy(async (token, done) => {
    const [isvalidtoken, error] = await of(validateToken(token))
    if (error) {
      if (error.message === 'jwt expired') {
        return done(new BadRequestError('Session Ended. Please Login Again!'))
      }
      if (error.message === 'invalid signature' || error.message === 'invalid token') {
        return done(new AuthenticationError('Token is invalid!'))
      }
      return done(error)
    }
    if (!isvalidtoken) {
      return done(new AuthenticationError('User Does Not Exist!'))
    }

    const { email } = decodeToken(token)

    const attributes = ['id', 'name', 'email', 'btc_address', 'eth_address']
    const [user, dbError] = await of(User.findOne({ where: { email }, attributes }))

    if (dbError || !user) {
      return done(new AuthenticationError('User Does Not Exist!'))
    }

    return done(null, user)
  }))
}

module.exports = initPassport
