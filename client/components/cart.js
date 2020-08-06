import {connect} from 'react-redux'
import React from 'react'
import fetchCart from '../store/cart'

class Cart extends React.Component {
  ///possible use of useDispatch hook instead?
  componentDidMount() {
    this.props.fetchCart(this.props.cart)
  }

  render() {
    const cart = this.props.cart

    return (
      <div>
        {cart.length ? (
          cart.map(item => {
            return (
              <div>
                <div>
                  <div>{item.bread.name}</div>
                  <img src={item.bread.imageUrl} />
                  <p>{item.bread.description}</p>
                </div>
                <div>Amount: {item.quantity}</div>
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
    cart: state.cartReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: cart => dispatch(fetchCart(cart))
  }
}

export default connect(mapState, mapDispatch)(Cart)
