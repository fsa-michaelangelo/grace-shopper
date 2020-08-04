const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    defaultValue: 'active',
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['active', 'complete']
  }
})
module.exports = Order
