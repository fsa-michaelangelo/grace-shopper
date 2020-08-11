const {green, red} = require('chalk')
const {db, User, Bread, Order} = require('./server/db')
const OrderDetails = require('./server/db/models/orderDetails')

const seed = async () => {
  try {
    await db.sync({force: true})

    // seed your database here!
    const sourdough = await Bread.create({
      name: 'Sourdough',
      quantity: 3,
      imageUrl: 'https://i.ibb.co/7W94P06/sourdough.jpg',
      price: 8,
      description:
        'Our handcrafted sourdough is leavened with naturally occurring bacteria and yeast - this gives it the distinct sour taste and open and irregular crumb. To be fair this is true for all sourdough, but we happen to like ours best.'
    })
    const french = await Bread.create({
      name: 'French',
      quantity: 4,
      imageUrl: 'https://i.ibb.co/3mCRbQd/french.jpg',
      price: 6,
      description:
        'Not quite a baguette, but not quite Italian bread, our french loaf has a soft interior and crusty exterior that makes this bread perfect for making garlic bread or bruscetta. Or you know, just shoving it right in your mouth.'
    })
    const brioche = await Bread.create({
      name: 'Brioche',
      quantity: 10,
      imageUrl: 'https://i.ibb.co/ZWLgxfL/brioche.jpg',
      price: 10,
      description:
        'Brioche is an enriched bread that is perfect for making French toast. Because it is a bit richer (and thus, more expensive) bread it was considered a luxury in Marie Antoinette\'s France, so you can understand the anger her people felt when she famously uttered "Qu\'ils mangent de la brioche".'
    })
    const biscuit = await Bread.create({
      name: 'Biscuits',
      quantity: 12,
      imageUrl: 'https://i.ibb.co/SQLgHxZ/biscuits.jpg',
      price: 10,
      description:
        "Our biscuits are made with our sourdough starter, giving them a slight tang that goes perfect with a sweet lemon curd or jam. If you ain't fancy, don't worry they're perfect for biscuits and gravy too! We sell these in batches of 8. Eat one on the way home and tell your family we sell them in batches of 7 - we won't tell."
    })
    const swirl = await Bread.create({
      name: 'Cinnamon Swirl Bread',
      quantity: 10,
      imageUrl: 'https://i.ibb.co/SwnWX9L/cinnamon.jpg',
      price: 8,
      description:
        "Would you believe it if we told you our cinamon swirl bread was made with our sourdough starter? Would you care? It's perfect all by itself, toasted, or turned into French toast."
    })
    const cinnamonRoll = await Bread.create({
      name: 'Cinnamon Roll',
      quantity: 12,
      imageUrl: 'https://i.ibb.co/SK1WqfL/cinnamonrolls.jpg',
      price: 15,
      description:
        "Yeah, this is amde with our sourdough starter too. I won't bore you with the details. Just know that this tray of one dozen cinnamon rolls is the perfect dish for a special breakfast. OR any other breakfast."
    })
    const croissant = await Bread.create({
      name: 'Croissants',
      quantity: 24,
      imageUrl: 'https://i.ibb.co/ZxFbDGh/croissants.jpg',
      price: 4,
      description:
        'No sourdough in this one - just butter. And a little bit of flour. But mostly butter.'
    })
    const multigrain = await Bread.create({
      name: 'Multigrain Loaf',
      quantity: 8,
      imageUrl: 'https://i.ibb.co/JQSgwCN/multigrain.jpgg',
      price: 6,
      description:
        "Our seven grain bread is perfect for sandwiches, or toast. It feels a bit healthier than plain white bread, and it probably is, but we didn't check. We'll even slice it for you if you ask nicely."
    })
    const naan = await Bread.create({
      name: 'Naan',
      quantity: 30,
      imageUrl: 'https://i.ibb.co/fN3mznR/naan.jpg',
      price: 3,
      description:
        "Our naan isn't actually naan. It also isn't roti. It's somewhere in between. Either way you slice it (yeah we know you don't really slice flatbreads) it's good. Perfect with some melted butter and garlic."
    })
    const white = await Bread.create({
      name: 'White Bread',
      quantity: 20,
      imageUrl: 'https://i.ibb.co/qR69zN4/white.jpg',
      price: 5,
      description:
        "This is it. The classic. The original. The one and only. All our other breads are the greatest thing since this. And this? Well, it's just the greatest."
    })
    const wreath = await Bread.create({
      name: 'Fruit Wreath',
      quantity: 5,
      imageUrl: 'https://i.ibb.co/74Zxy1j/wreath.jpg',
      price: 20,
      description:
        "This tear and share wreath is loaded with dried fruits, nuts, and cinnamon. It's the perfect dessert centerpiece for any holiday celebration."
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

    const orderFor2 = await Order.create({
      userId: user2.id
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

    const orderDets2 = await OrderDetails.create({
      orderId: orderFor2.id,
      breadId: french.id,
      price: 3,
      quantity: 1
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
