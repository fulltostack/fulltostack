'use strict'

const Sequelize = require('sequelize')
const logger = require('../lib/logger')

/**
 * Actions summary:
 *
 * addColumn "password" to table "users"
 *
 **/

const info = {
  revision: 2,
  name: 'add-user-password',
  created: '2019-09-12T20:41:20.865Z',
  comment: ''
}

const migrationCommands = [{
  fn: 'addColumn',
  params: [
    'users',
    'password',
    {
      type: Sequelize.TEXT,
      field: 'password',
      unique: false,
      required: true,
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
