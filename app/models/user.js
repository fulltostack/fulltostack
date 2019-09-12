const Sequelize = require('sequelize')
const walletValidator = require('wallet-address-validator')

const UserSchema = (sequelize) => {
  return sequelize.define('user', {
    name: {
      type: Sequelize.STRING(512),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(1000),
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(1000),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    btc_address: {
      type: Sequelize.STRING(34),
      allowNull: false,
      validate: {
        isValidAddress: address => {
          if (!walletValidator.validate(address, 'BTC')) {
            throw new Error('Invalid Ethereum Address')
          }
        }
      },
      unique: true
    },
    btc_balance: {
      type: Sequelize.DECIMAL(18, 8),
      allowNull: false,
      validate: { min: 0, max: 1000000000 }
    },
    eth_address: {
      type: Sequelize.STRING(42),
      allowNull: false,
      validate: {
        isValidAddress: address => {
          if (!walletValidator.validate(address, 'ETH')) {
            throw new Error('Invalid Bitcoin Address')
          }
        }
      },
      unique: true
    },
    eth_balance: {
      type: Sequelize.DECIMAL(28, 18),
      allowNull: false,
      validate: { min: 0, max: 1000000000 }
    },
    transaction_max: {
      type: Sequelize.DECIMAL(28, 18),
      allowNull: false,
      defaultValue: 1000,
      validate: { min: 0, max: 1000000000 }
    }
  })
}

module.exports = UserSchema
