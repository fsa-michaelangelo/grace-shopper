const router = require('express').Router()
const {User} = require('../db/models')
//const {Order} = require('../db/models')
module.exports = router

const adminsOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error(`You aren't authorized to access this data.`)
    err.status = 401
    next(err)
  }
  next()
}

router.get('/', adminsOnly, async (req, res, next) => {
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


