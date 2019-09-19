const logger = require('../../lib/logger')

class TransactionProcessorQueue {
  async consume (transaction, done) {
    try {
      logger.info(transaction)
      done()
    } catch (error) {
      done(error)
    }
  }
}

module.exports = new TransactionProcessorQueue()
