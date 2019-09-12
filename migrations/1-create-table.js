'use strict'

const Sequelize = require('sequelize')
const logger = require('./../lib/logger')

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "transactions", deps: [users, users]
 *
 **/

const info = {
  revision: 1,
  name: 'create-table',
  created: '2019-09-12T18:15:06.979Z',
  comment: ''
}

const migrationCommands = [{
  fn: 'createTable',
  params: [
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(512),
        field: 'name',
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(1000),
        field: 'description',
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(1000),
        field: 'email',
        allowNull: false
      },
      btc_address: {
        type: Sequelize.STRING(34),
        field: 'btc_address',
        unique: true,
        allowNull: false
      },
      btc_balance: {
        type: Sequelize.DECIMAL(18, 8),
        field: 'btc_balance',
        allowNull: false
      },
      eth_address: {
        type: Sequelize.STRING(42),
        field: 'eth_address',
        unique: true,
        allowNull: false
      },
      eth_balance: {
        type: Sequelize.DECIMAL(28, 18),
        field: 'eth_balance',
        allowNull: false
      },
      transaction_max: {
        type: Sequelize.DECIMAL(28, 18),
        field: 'transaction_max',
        defaultValue: 1000,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false
      }
    },
    {}
  ]
},
{
  fn: 'createTable',
  params: [
    'transactions',
    {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      currency_amount: {
        type: Sequelize.DECIMAL(28, 18),
        field: 'currency_amount',
        defaultValue: 1000
      },
      currency_type: {
        type: Sequelize.ENUM('BTC', 'ETH'),
        field: 'currency_type',
        allowNull: false,
        defaultValue: 'BTC'
      },
      state: {
        type: Sequelize.ENUM('PENDING', 'IN-PROGRESS', 'COMPLETED', 'ERROR'),
        field: 'state',
        allowNull: false,
        defaultValue: 'PENDING'
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false
      },
      source_user_id: {
        type: Sequelize.INTEGER,
        field: 'source_user_id',
        onUpdate: 'CASCADE',
        onDelete: 'cascade',
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        name: 'source_user_id'
      },
      target_user_id: {
        type: Sequelize.INTEGER,
        field: 'target_user_id',
        onUpdate: 'CASCADE',
        onDelete: 'cascade',
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        name: 'target_user_id'
      }
    },
    {}
  ]
}
]

module.exports = {
  pos: 0,
  up: function (queryInterface, Sequelize) {
    let index = this.pos
    return new Promise(function (resolve, reject) {
      function next () {
        if (index < migrationCommands.length) {
          const command = migrationCommands[index]
          logger.info('[#' + index + '] execute: ' + command.fn)
          index++
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject)
        } else { resolve() }
      }
      next()
    })
  },
  info: info
}
