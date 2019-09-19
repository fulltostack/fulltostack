'use strict'

const Sequelize = require('sequelize')
const logger = require('../lib/logger')

/**
 * Actions summary:
 *
 * addColumn "version" to table "users"
 *
 **/

const info = {
  revision: 6,
  name: 'add-user-version',
  created: '2019-09-19T18:21:18.003Z',
  comment: ''
}

const migrationCommands = [{
  fn: 'addColumn',
  params: [
    'users',
    'version',
    {
      type: Sequelize.INTEGER,
      field: 'version',
      defaultValue: 0,
      allowNull: false
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
