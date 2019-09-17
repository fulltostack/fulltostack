const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy

const User = require('../app/models').User
const AuthenticationError = require('../app/errors/authenticationError')

function initPassport () {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  passport.use(new BasicStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email, password }, attributes: ['id', 'name', 'email'], raw: true })

      if (!user) {
        return done(new AuthenticationError('User Does Not Exist!'))
      }
      return done(null, user)
    } catch (error) {
      done(error)
    }
  }))
}

module.exports = initPassport
