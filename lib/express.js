const express = require('express')
const initRoutes = require('../app/routes')

const app = express()

function initPingURL () {
  app.get('/_ping', (req, res) => {
    res.status(200).send({ result: 'Ping Received!!!' })
  })
}

function catchNotFound () {
  app.use((req, res) => res.status(400).send({ reason: 'Not Found' }))
}

function catchErrorRoutes () {
  app.use((err, req, res, next) => {
    if (!err) return next()
    return res.status(400).send({ reason: err.message })
  })
}

function init () {
  // Initialize Ping URL
  initPingURL()

  // Initialize API Routes
  initRoutes(app)

  // Initialize Not Found Route
  catchNotFound()

  // Initialize Error Routes
  catchErrorRoutes()

  return app
}

module.exports.init = init
