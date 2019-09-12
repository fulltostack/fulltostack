'use strict'

const Sequelize = require('sequelize')
const logger = require('../lib/logger')

/**
 * Actions summary:
 *
 * changeColumn "eth_address" on table "users"
 * changeColumn "btc_address" on table "users"
 *
 **/

const info = {
  revision: 4,
  name: 'wallet-address-set-null',
  created: '2019-09-12T21:14:20.041Z',
  comment: ''
}

const migrationCommands = [{
  fn: 'changeColumn',
  params: [
    'users',
    'eth_address',
    {
      type: Sequelize.STRING(42),
      field: 'eth_address',
      unique: true,
      allowNull: true
    }
  ]
},
{
  fn: 'changeColumn',
  params: [
    'users',
    'btc_address',
    {
      type: Sequelize.STRING(34),
      field: 'btc_address',
      unique: true,
      allowNull: true
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
