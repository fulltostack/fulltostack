const http = require('http')
const logger = require('./logger')
const express = require('./express')
const database = require('./sequelize')
const onTerminationShutGracefully = require('./shutdown')

function createServer (app) {
  return http.createServer(app).listen(process.env.PORT)
}

async function start () {
  await database.connect()

  const app = express.init()

  const server = createServer(app)

  onTerminationShutGracefully(server)

  return `Server started at http://localhost:${process.env.PORT}.`
}

module.exports = { start, logger }
