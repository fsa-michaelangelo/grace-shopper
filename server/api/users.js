const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // even though users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'address', 'phone']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
