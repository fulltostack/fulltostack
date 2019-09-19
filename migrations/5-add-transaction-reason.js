'use strict'

const Sequelize = require('sequelize')
const logger = require('../lib/logger')

/**
 * Actions summary:
 *
 * addColumn "reason" to table "transactions"
 *
 **/

const info = {
  revision: 5,
  name: 'add-transaction-reason',
  created: '2019-09-19T16:51:29.877Z',
  comment: ''
}

const migrationCommands = [{
  fn: 'addColumn',
  params: [
    'transactions',
    'reason',
    {
      type: Sequelize.STRING(100),
      field: 'reason',
      allowNull: true
    }
  ]
}]

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
