require('dotenv').config()

const Sequelize = require('sequelize')
const UserSchema = require('./user')
const TransactionSchema = require('./transaction')

const dbsettings = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  pool: {
    max: 40,
    min: 0,
    idle: 10000
  },
  define: {
    underscored: true
  }
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  dbsettings
)

const User = UserSchema(sequelize)
const Transaction = TransactionSchema(sequelize)

Transaction.belongsTo(User, { as: 'source_user', foreignKey: { name: 'source_user_id', allowNull: false }, onDelete: 'cascade' })
Transaction.belongsTo(User, { as: 'target_user', foreignKey: { name: 'target_user_id', allowNull: false }, onDelete: 'cascade' })
User.hasMany(Transaction, { as: 'source_user', foreignKey: { name: 'source_user_id', allowNull: false }, onDelete: 'cascade' })
User.hasMany(Transaction, { as: 'target_user', foreignKey: { name: 'target_user_id', allowNull: false }, onDelete: 'cascade' })

module.exports = {
  User,
  Transaction,
  sequelize,
  Sequelize
}
