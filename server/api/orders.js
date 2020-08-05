const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderDetails} = require('../db/models')
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

router.get('/:orderId/details', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const orders = await Order.findAll({
      where: {orderId},
      include: [OrderDetails]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
