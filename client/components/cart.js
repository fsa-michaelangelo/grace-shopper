import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import React from 'react'
import {fetchCart, removeCartItem} from '../store/cart'
import SingleBread from './single-bread'

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

  async componentDidMount() {
    await this.props.fetchCart()
  }

  render() {
    const cart = this.props.cart

    return (
      <div>
        {cart.length ? (
          cart.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <div>{item.name}</div>
                  <img src={item.imageUrl} />
                  <p>{item.description}</p>
                </div>
                {item.orderDetails ? (
                  <>
                    <div onChange={this.handleChange}>
                      <input
                        type="number"
                        name="quantity"
                        placeholder={Number(item.orderDetails.quantity)}
                      />
                    </div>
                    <div>
                      <p> price: ${item.orderDetails.price}</p>
                    </div>
                  </>
                ) : null}
                <button
                  onClick={() => {
                    this.props.removeItem(item, 0)
                  }}
                >
                  Remove item from cart
                </button>
                <>
                  <Link to={`/breads/${item.id}`} component={SingleBread}>
                    Need to change the amount?
                  </Link>
                </>
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