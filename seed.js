const {green, red} = require('chalk')
const {db, User, Item} = require('./server/db')
console.log('the db is ', db)
const seed = async () => {
  try {
    await db.sync({force: true})

    // seed your database here!
    const sourdough = await Item.create({
      name: 'Sourdough',
      quantity: 3,
      imageUrl:
        'https://www.acouplecooks.com/wp-content/uploads/2018/10/Homemade-Sourdough-Bread-004.jpg',
      price: 8
    })
    const french = await Item.create({
      name: 'French',
      quantity: 4,
      imageUrl:
        'https://www.melskitchencafe.com/wp-content/uploads/french-bread2-480x360.jpg',
      price: 6
    })
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
