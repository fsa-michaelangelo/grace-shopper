const router = require('express').Router()
const {Bread} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const breads = await Bread.findAll()
    res.json(breads)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const item = await Bread.findOne({
      where: {
        id: id
      }
    })
    res.json(item)
  } catch (err) {
    next(err)
  }
})
