const router = require('express').Router()
const {User, Order, Bread, OrderDetails} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'active'
        },
        include: [Bread]
      })

      console.log('ORDER', order.bread.orderDetails)
      const cart = await OrderDetails.findAll({
        where: {
          orderId: order.id
        }
      })

      console.log('CART', cart)

      const bread = await Promise.all(
        cart.map(async item => {
          item.bread = await Bread.findByPk(item.breadId)
        })
      )

      console.log('BREAD', bread)
      res.json(order.bread)
    } else {
      if (!req.session.cart) {
        req.session.cart = []
      }

      const guestCart = req.session.cart
      //   await Promise.all(
      //     guestCart.map(async item => {
      //       item.bread = await Bread.findByPk(item.breadId);
      //     })
      //   );
      console.log(guestCart)
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
        quantity: req.body.quantity,
        price: req.body.price
      })

      res.status(204).end()
    } else {
      if (!req.session.cart) {
        req.session.cart = []
      }

      console.log('GUREST sessioncart', req.body)
      //   const body = {}
      //   body.bread = req.body.bread

      req.session.cart = [...req.session.cart, req.body] ////DESTRUCTURE quantity
      const guestCart = req.session.cart
      console.log('GUEST CART', guestCart)
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
