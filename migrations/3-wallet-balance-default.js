'use strict'

const Sequelize = require('sequelize')
const logger = require('../lib/logger')

/**
 * Actions summary:
 *
 * changeColumn "eth_balance" on table "users"
 * changeColumn "btc_balance" on table "users"
 *
 **/

const info = {
  revision: 3,
  name: 'wallet-balance-default',
  created: '2019-09-12T20:56:52.542Z',
  comment: ''
}

const migrationCommands = [{
  fn: 'changeColumn',
  params: [
    'users',
    'eth_balance',
    {
      type: Sequelize.DECIMAL(28, 18),
      field: 'eth_balance',
      defaultValue: 0,
      allowNull: false
    }
  ]
},
{
  fn: 'changeColumn',
  params: [
    'users',
    'btc_balance',
    {
      type: Sequelize.DECIMAL(18, 8),
      field: 'btc_balance',
      defaultValue: 0,
      allowNull: false
    }
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
