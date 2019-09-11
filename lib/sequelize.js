const sequelize = require('../app/models').sequelize

async function connect () {
  await sequelize.authenticate()
  return sequelize.sync()
}

async function disconnect () {
  await sequelize.close()
}

module.exports.connect = connect
module.exports.disconnect = disconnect
