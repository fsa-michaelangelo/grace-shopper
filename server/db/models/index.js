const User = require('./user')
const Bread = require('./bread')
const Order = require('./order')
const OrderDetails = require('./orderDetails')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Order)
Order.belongsTo(User)
Bread.belongsToMany(Order, {
  through: OrderDetails
})
Order.belongsToMany(Bread, {
  through: OrderDetails
})
module.exports = {
  User,
  Bread,
  Order,
  OrderDetails
}
