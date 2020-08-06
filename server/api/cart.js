const router = require('express').Router()
const {User, Order, Bread, OrderDetails} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const {bread} = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'active'
        },
        include: [Bread]
      })

      res.json(bread)
    } else {
      if (!req.session.cart) {
        req.session.cart = []
      }

      const guestCart = req.session.cart

      res.json(guestCart)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findOrCreate({
        where: {
          userId: req.user.id
        }
      })

      console.log('Order', order)
      const cart = await OrderDetails.create({
        orderId: order.id,
        breadId: req.body.id,
        quantity: req.body.quantity
      })

      res.status(204).end()
    } else {
      if (!req.session.cart) {
        req.session.cart = []
      }

      console.log(req.body)
      req.session.cart = req.body
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
