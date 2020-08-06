const router = require('express').Router()
const {User, Order, Bread, OrderDetails} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('Session', req.user)

    if (req.user) {
      const orders = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'active'
        }
      })

      console.log(orders)
      const cart = await OrderDetails.findOne({
        where: {
          orderId: orders.id
        },
        include: Bread
      })

      res.json(cart)
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
