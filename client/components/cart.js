import {connect} from 'react-redux'
import React from 'react'
import {fetchCart} from '../store/cart'

class Cart extends React.Component {
  ///possible use of useDispatch hook instead?
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const cart = this.props.cart

    return (
      <div>
        {cart.length ? (
          cart.map(item => {
            return (
              <div key={item.id}>
                <div>
                  <div>{item.name}</div>
                  <img src={item.imageUrl} />
                  <p>{item.description}</p>
                </div>
                <div>Amount: {item.orderDetails.quantity}</div>
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
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
