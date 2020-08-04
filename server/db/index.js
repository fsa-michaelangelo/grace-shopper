const db = require('./db')

// register models
const {User, Item} = require('./models')

module.exports = {db, User, Item}
