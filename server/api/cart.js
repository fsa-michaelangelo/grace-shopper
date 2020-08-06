const router = require('express').Router()
const {User, Order, Bread, OrderDetails} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      console.log('Session', req.user)
      const {bread} = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'active'
        },
        include: [Bread]
      })

      res.json(bread)
    } else if (!req.session.cart) {
      req.session.cart = []

      const guestCart = req.session.cart
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      await Order.findOrCreate
    } else if (!req.session.cart) {
      req.session.cart = []

      const guestCart = req.session.cart

      res.json(guestCart)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    if (req.user) {
      if (req.params.id) {
        console.log(req.params.id)
      }
    }
  } catch (err) {
    next(err)
  }
})
