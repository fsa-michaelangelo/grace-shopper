const Sequelize = require('sequelize')
const db = require('../db')

const Bread = db.define('bread', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      max: 30,
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  }
})

module.exports = Bread
