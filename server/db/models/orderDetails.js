const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetails = db.define('orderDetails', {
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  }
})

///get total

module.exports = OrderDetails
