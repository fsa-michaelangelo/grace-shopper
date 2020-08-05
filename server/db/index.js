const db = require('./db')

// register models
const {User, Bread, Order, OrderDetails} = require('./models')

module.exports = {db, User, Bread, Order, OrderDetails}
