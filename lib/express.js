const express = require('express')
const initRoutes = require('../app/routes')

const app = express()

function init () {
  // Initialize API Routes
  initRoutes(app)

  return app
}

module.exports.init = init
