const express = require('express')
const passport = require('passport')

const UserController = require('../controllers/user')

function initUserRoutes () {
  const UserRouter = express.Router()

  UserRouter.post('/signup', UserController.signup)
  UserRouter.post('/signin', passport.authenticate('basic'), UserController.signin)

  return UserRouter
}

module.exports = initUserRoutes
