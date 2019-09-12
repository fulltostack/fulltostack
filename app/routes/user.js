const express = require('express')

const UserController = require('../controllers/user')

function initUserRoutes () {
  const UserRouter = express.Router()

  UserRouter.post('/signup', UserController.signup)

  return UserRouter
}

module.exports = initUserRoutes
