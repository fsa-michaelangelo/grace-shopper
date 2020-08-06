const router = require('express').Router()
const {Order, OrderDetails} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    console.log('Session', req.session.store)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.session.userId
      },
      include: [Bread]
    })

    console.log('sessh', req.session.passport)
    // if(req.session.cart){
    //   console.log("Session", req.session)
    // }else{

    // }

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
