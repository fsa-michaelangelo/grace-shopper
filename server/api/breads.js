const router = require('express').Router()
const {Bread} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const bread = await Bread.findOne({
      where: {
        id: id
      }
    })
    res.json(bread)
  } catch (err) {
    next(err)
  }
})
