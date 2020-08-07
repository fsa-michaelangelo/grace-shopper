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

      //   console.log('ORDER', order.bread)
      //   const cart = await OrderDetails.findAll({
      //     where: {
      //       orderId: order.id
      //     }
      //   })

      //   console.log('CART', cart)

      //console.log('BREAD', cart)
      res.json(order.bread)
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
      const [order, boolean] = await Order.findOrCreate({
        where: {
          userId: req.user.id
        }
      })

      if (boolean) {
        console.log('FALSES')
        const {bread, orderDetails} = await OrderDetails.create({
          orderId: order.id,
          breadId: req.body.bread.id,
          quantity: req.body.quantity,
          price: req.body.price
        })

        res.status(200).json()
      } else {
        const [cart] = await OrderDetails.findAll({
          where: {
            orderId: order.id
          }
        })

        const updatedCart = await cart.update({
          quantity: req.body.quantity
        })

        console.log('UPDATED', updatedCart)
        res.status(200).end()
      }
    } else {
      if (!req.session.cart) {
        req.session.cart = []
      }

      req.session.cart = [...req.session.cart, req.body]
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
        //change status
        //change quantity
      }
    } else {
      delete req.session.cart
      res
        .status(200)
        .json({message: 'Cart successfully emptied', totalCartItems: 0})
    }
  } catch (err) {
    next(err)
  }
})
