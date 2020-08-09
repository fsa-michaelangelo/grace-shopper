const router = require('express').Router()
const {Order} = require('../db/models')
const {Bread} = require('../db/models')
const {OrderDetails} = require('../db/models')
module.exports = router

const usersOnly = (req, res, next) => {
  if (!req.user) {
    const err = new Error(`You aren't authorized to access this data.`)
    err.status = 401
    next(err)
  }
  next()
}

router.get('/', usersOnly, async (req, res, next) => {
  try {
    const userId = req.user.id
    const orders = await Order.findAll({
      where: {userId}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', usersOnly, async (req, res, next) => {
  try {
    const id = req.params.orderId
    const order = await Order.findOne({
      where: {id},
      include: [Bread]
    })
    //const details = await OrderDetails.findAll({where: { orderId: id}} );

    res.json(order)
  } catch (err) {
    next(err)
  }
})
