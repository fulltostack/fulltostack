const gracefulShutdown = require('http-graceful-shutdown')

const logger = require('./logger')
const database = require('./sequelize')

async function cleanup () {
  await database.disconnect()
  logger.info('Database disconnected')
}

async function onTerminationShutGracefully (server) {
  gracefulShutdown(server, {
    signals: 'SIGINT SIGTERM SIGHUP',
    timeout: process.env.SHUTDOWN_TIMEOUT,
    onShutdown: cleanup,
    finally: function () {
      logger.info('Server is gracefully terminated')
    }
  })
}

module.exports = onTerminationShutGracefully
