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
router.get('/group/:name', async (req, res, next) => {
  const name = req.params.name
  try {
    const breadGroup = await Bread.findAll({
      where: {
        name
      }
    })
    res.json(breadGroup)
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
