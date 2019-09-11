const http = require('http')
const express = require('express')
const logger = require('./logger')
const database = require('./sequelize')

async function start () {
  await database.connect()

  const app = express()

  app.get('/graphql', (req, res) => {
    res.status(200).send({ message: 'Server Started!' })
  })

  http.createServer(app).listen(process.env.PORT)

  return 'Server Started!'
}

module.exports = { start, logger }
