const Sequelize = require('sequelize')

const TransactionSchema = (sequelize) => {
  return sequelize.define('transaction', {
    currency_amount: {
      type: Sequelize.DECIMAL(28, 18),
      defaultValue: 1000,
      validate: { min: 0, max: 1000000000 }
    },
    currency_type: {
      type: Sequelize.ENUM('BTC', 'ETH'),
      defaultValue: 'BTC',
      allowNull: false
    },
    state: {
      type: Sequelize.ENUM('PENDING', 'IN-PROGRESS', 'COMPLETED', 'ERROR'),
      defaultValue: 'PENDING',
      allowNull: false
    },
    reason: {
      type: Sequelize.STRING(100),
      allowNull: true
    }
  })
}

module.exports = TransactionSchema
