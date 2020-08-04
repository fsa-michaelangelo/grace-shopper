const db = require('./db')

// register models
const {User, Bread, Order} = require('./models')

module.exports = {db, User, Bread, Order}
