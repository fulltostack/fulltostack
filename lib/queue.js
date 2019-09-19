const queue = require('async.queue')

const logger = require('./logger')
const transactionProcessor = require('../app/consumers/transactionProcessor')

class Producer {
  constructor (handler) {
    this.name = handler.constructor.name + 'Queue'
    this.queue = queue((task, done) => handler.consume(...task, done), handler.consumers)
  }

  errorHandler (err) {
    logger.error(`${this.name}: ${err.message}`)
  }

  push () {
    this.queue.push([arguments], (err) => {
      if (err) return this.errorHandler(err)
      logger.silly('Task Processed')
    })
  }
}

const transactionProducer = new Producer(transactionProcessor)

module.exports = { transactionProducer }
