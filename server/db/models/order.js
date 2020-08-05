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

Order.beforeCreate = userId => {
  const activeOrders = this.findAll({
    where: {
      userId: {
        status: 'active'
      }
    }
  })

  activeOrders.status = 'complete'
}

///update bread inventory

module.exports = Order
