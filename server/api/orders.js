const router = require('express').Router()
const {Order} = require('../db/models')
const {Bread} = require('../db/models')
//const {OrderDetails} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
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

router.get('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId
    const order = await Order.findOne({
      where: {id},
      include: [Bread]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})
