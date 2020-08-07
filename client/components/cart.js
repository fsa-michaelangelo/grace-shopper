import {connect} from 'react-redux'
import React from 'react'
import {fetchCart, removeCartItem, addItemToCart} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  ///possible use of useDispatch hook instead?
  async componentDidMount() {
    await this.props.fetchCart()
  }

  render() {
    const cart = this.props.cart
    console.log('CART', cart)
    return (
      <div>
        {cart.length ? (
          cart.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <div>{item.bread.name}</div>
                  <img src={item.bread.imageUrl} />
                  <p>{item.bread.description}</p>
                </div>
                <div onChange={this.handleChange}>
                  <input
                    type="number"
                    name="quantity"
                    placeholder={Number(item.quantity)}
                  />
                </div>
                {/* <button onClick={() => {
                    this.state.quantity
                    ? this.addItemToCart(item, this.state.quantity, item.bread.price)
                    : this.removeItem(item)}}>
                    Remove item from cart
                  </button> */}
              </div>
            )
          })
        ) : (
          <h1>Any way you slice it there's nothin here...</h1>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    removeItem: bread => dispatch(removeCartItem(bread)),
    addItemToCart: (bread, quantity, price) => dispatch(bread, quantity, price)
  }
}

export default connect(mapState, mapDispatch)(Cart)
