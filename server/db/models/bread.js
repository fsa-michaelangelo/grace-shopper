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
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  }
})

module.exports = Bread
