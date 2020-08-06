const {db, User, Bread, Order} = require('./server/db')
const OrderDetails = require('./server/db/models/orderDetails')

const seed = async () => {
  try {
    await db.sync({force: true})

    // seed your database here!
    const sourdough = await Bread.create({
      name: 'Sourdough',
      quantity: 3,
      imageUrl:
        'https://www.acouplecooks.com/wp-content/uploads/2018/10/Homemade-Sourdough-Bread-004.jpg',
      price: 8
    })
    const french = await Bread.create({
      name: 'French',
      quantity: 4,
      imageUrl:
        'https://www.melskitchencafe.com/wp-content/uploads/french-bread2-480x360.jpg',
      price: 6
    })

    const user1 = await User.create({
      email: 'email@email.com',
      password: 'pass@WORD'
    })

    const user2 = await User.create({
      email: 'email2@gmail.com',
      password: 'heyyyoooo12345'
    })

    const order1 = await Order.create({
      userId: user1.id,
      status: 'complete'
    })

    const order2 = await Order.create({
      userId: user1.id
    })

    const orderDets1 = await OrderDetails.create({
      orderId: order1.id,
      breadId: sourdough.id,
      price: 3,
      quantity: 2
    })

    const orderDets12 = await OrderDetails.create({
      orderId: order1.id,
      breadId: french.id,
      price: 2,
      quantity: 1
    })

    // const orderDets12 = await OrderDetails.create({
    //   orderId: order1.id,
    //   breadId : [sourdough.id, french.id],
    //   price: 3,
    //   quantity: 1
    // })
  } catch (err) {
    console.log(err)
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
      db.close()
    })
}
