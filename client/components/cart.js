import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import React from 'react'
import {fetchCart, removeCartItem} from '../store/cart'
import SingleBread from './single-bread'
import GuestCart from './guestCart'

class Cart extends React.Component {

  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    let cartTotal = 0;
    const cart = this.props.cart

    return (
      <>
        {cart.length ? (
          cart[0].bread ? (
            <GuestCart cart={cart}  />
          ) : (
            cart.map((item, index) => {
              cartTotal += (item.quantity * item.price)
              return (
                <div className='cart-item' key={index}>
                  <div>
                    <img src={item.imageUrl} />
                  </div>
                  <div className='cart-details'>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    {
                      item.orderDetails ? (
                        <>
                          <div>Price: ${item.orderDetails.price}</div>
                          <div className='quantity'>
                            Quantity: {Number(item.orderDetails.quantity)}
                            <Link to={`/breads/${item.id}`} component={SingleBread}>
                              <sub>Change amount?</sub>
                            </Link>
                          </div>
                        </>
                      ) : null
                    }
                    <button
                      onClick={() => {
                        this.props.removeItem(item)
                      }}>
                        Remove item
                    </button>
                  </div>
                </div>
              )
            })
          )
        ) : (
          <h3>Any way you slice it there's nothin here...</h3>
        )}

        {cart.length ? (
          <>
            {
              cart[0].id
              ? <h3>Total: ${cartTotal}</h3>
              : null
            }

            <Link to="/cart/checkout">
              <button type="submit">Checkout</button>
            </Link>
          </>
        ) : null}
      </>
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
    removeItem: bread => dispatch(removeCartItem(bread))
    //addItemToCart: (bread, quantity, price) => dispatch(bread, quantity, price)
  }
}

export default connect(mapState, mapDispatch)(Cart)
