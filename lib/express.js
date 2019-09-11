const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const logger = require('./logger')
const initRoutes = require('../app/routes')

const app = express()

function initMiddleware () {
  app.use(methodOverride())

  app.use(cors())

  app.use(bodyParser.json({ limit: '50mb' }))

  app.use(morgan('combined', logger.stream))
}

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
  // Initialize Middlewares
  initMiddleware()

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
