const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const orders = await Order.findAll({
      where: {userId}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
