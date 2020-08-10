const router = require('express').Router()
const {User, Order, Bread, OrderDetails} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const [order] = await Order.findAll({
        where: {
          userId: req.user.id,
          status: 'active'
        },
        include: [Bread]
      })

      const cart = await OrderDetails.findAll({
        where: {
          orderId: order.id
        }
      })

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
          userId: req.user.id,
          status: 'active'
        }
      })

      if (boolean) {
        const {bread, orderDetails} = await OrderDetails.create({
          orderId: order.id,
          breadId: req.body.bread.id,
          quantity: req.body.quantity,
          price: req.body.price
        })

        res.status(200).json()
      } else {
        const cart = await OrderDetails.findAll({
          where: {
            orderId: order.id,
            breadId: req.body.bread.id
          }
        })

        const breadArr = cart.filter(
          order => order.breadId === req.body.bread.id
        )

        if (!breadArr.length) {
          const orderDetail = await OrderDetails.create({
            orderId: order.id,
            breadId: req.body.bread.id,
            quantity: req.body.quantity,
            price: req.body.price
          })
        } else {
          const updatedCart = await OrderDetails.update(
            {
              quantity: req.body.quantity
            },
            {
              where: {
                orderId: order.id,
                breadId: req.body.bread.id
              }
            }
          )
        }

        //if(req.body.quantity > 0){

        res.status(200).end()
      }
    } else {
      if (!req.session.cart) {
        req.session.cart = []
      }

      const oldCart = req.session.cart

      const newCart = req.session.cart.filter(
        bread => bread.id !== req.body.bread.id
      )

      if (oldCart.length === newCart.length) {
        req.session.cart = [...req.session.cart, req.body]

        res.json(req.session.cart)
      } else {
        newCart.forEach(bread => {
          if (bread.id !== req.body.bread.id) {
            bread.quantity = req.body.quantity
          }
        })

        res.json(newCart)
      }
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:breadId', async (req, res, next) => {
  try {
    const id = req.params.breadId
    if (req.user) {
      const [order] = await Order.findAll({
        where: {
          userId: req.user.id,
          status: 'active'
        }
      })

      await OrderDetails.destroy({
        where: {
          orderId: order.id,
          breadId: id
        }
      })
    } else {
      const filteredCart = req.session.cart.filter(bread => bread.id !== id)

      req.session.cart = filteredCart
    }

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'active'
        }
      })

      await order.update({status: 'complete'})

      res.sendStatus(204)
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
