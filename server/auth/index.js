const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      console.log('the session is ', req.session)
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    //take id, findbypk id, .name = req.name etc, item.save()
    User.findByPk(id)
      .then(user => user.update(req.body))
      .then(user => res.json(user))
  } catch (err) {
    res.send('Please Enter Valid Account Settings')
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})
//trials
router.get('/me', (req, res) => {
  console.log('in api req ', req.body)
  res.json(req.user)
})

router.get('/set/:id', async (req, res) => {
  console.log('in set api')
  const id = req.params.id
  const updatedUser = await User.findByPk(id)
  res.json(updatedUser)
})

router.use('/google', require('./google'))
