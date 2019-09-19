const { of } = require('await-of')
const logger = require('../../lib/logger')
const { User, Transaction, Sequelize, sequelize } = require('../models')

class TransactionProcessorQueue {
  async consume (id, done) {
    const [txn, dbFindError] = await of(Transaction.findOne({ where: { id } }))
    if (dbFindError) {
      return done(dbFindError)
    }

    const walletBalanceField = `${txn.currency_type.toLowerCase()}_balance`

    const attributes = ['id', walletBalanceField]
    const whereSourceUser = { id: txn.source_user_id, [walletBalanceField]: { [Sequelize.Op.gte]: txn.currency_amount } }
    const whereTargetUser = { id: txn.target_user_id, [walletBalanceField]: { [Sequelize.Op.lte]: 1000000000 - txn.currency_amount } }

    let reason = null

    const transaction = await sequelize.transaction()

    const [[sourceUser, targetUser], dbErrorOnGet] = await of(Promise.all([
      User.findOne({ where: whereSourceUser, attributes, transaction }),
      User.findOne({ where: whereTargetUser, attributes, transaction })
    ]))

    const sourceUserOldBalance = sourceUser[walletBalanceField]
    const targetUserOldBalance = targetUser[walletBalanceField]

    if (!dbErrorOnGet && sourceUser && targetUser) {
      const [[updatedSourceUser, updatedTargetUser], dbErrorOnUpdate] = await of(Promise.all([
        sourceUser.decrement(walletBalanceField, { by: txn.currency_amount, transaction }),
        targetUser.increment(walletBalanceField, { by: txn.currency_amount, transaction })
      ]))

      const isSourceUpdated = updatedSourceUser[walletBalanceField] === (sourceUserOldBalance - txn.currency_amount)
      const isTargetUpdated = updatedTargetUser[walletBalanceField] === (targetUserOldBalance + txn.currency_amount)

      if (isSourceUpdated && isTargetUpdated) {
        const [result, dbCommitError] = await of(transaction.commit())
        logger.info(result)

        if (dbCommitError) {
          reason = reason || 'Internal Error. Transaction Failed on Commit!'
        }
      } else {
        reason = reason || 'Transaction Failed!'
      }

      if (dbErrorOnUpdate) {
        reason = reason || 'Internal Error. Transaction Failed on Update!'
      }
    }

    if (dbErrorOnGet) {
      reason = reason || 'Internal Error. Transaction Failed on Get!'
    }

    if (!sourceUser) {
      reason = reason || 'Insufficient Balance!'
    }

    if (!targetUser) {
      reason = reason || 'Breach of Transaction limit for Recipient!'
    }

    if (reason) {
      const [result, dbRollbackError] = await of(transaction.rollback())
      logger.info(result)

      if (dbRollbackError) {
        reason = reason || 'Internal Error. Transaction Failed on Rollback!'
      }

      txn.set('state', 'ERROR')
      txn.set('reason', reason)
    } else {
      txn.set('state', 'COMPLETED')
    }

    const [updatedTxn, dbTxnUpdateError] = await of(txn.save())
    if (dbTxnUpdateError) {
      return done(dbTxnUpdateError)
    }
    logger.info(`Transaction ${updatedTxn.id} is set to ${updatedTxn.state}`)
    return done()
  }
}

module.exports = new TransactionProcessorQueue()
