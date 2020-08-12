import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteItemsInCart} from '../store/cart'
import {Link} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import Cart from './cart'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shipName: '',
      shipAddress: '',
      shipPhone: '',
      email: '',
      orderPlaced: false
    }
    this.onToken = this.onToken.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      this.props.fetchCart()
    } catch (error) {
      console.log(error)
    }
  }

  handleSubmit() {
    event.preventDefault()
  }

  onToken = token => {
    console.log(this)
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    }).then(response => {
      response.json()
    })
    this.props.completeOrder()
    this.setState({orderPlaced: true})
  }

  render() {
    const cart = this.props.cart;
    console.log(cart)

    if (this.state.orderPlaced === true) {
      return (
        <>
          <h1>Order complete!</h1>
          <h3>
            Your order is processing. Forgot something? Click{' '}
            <Link to="/breads"><strong>here</strong></Link> to view our breads.
          </h3>
        </>
      )
    } else
      return (
        <>
          <script src="https://js.stripe.com/v3/" />
          <div className='header'>
              <h1>Checkout</h1>
          </div>
          <div>
            <form id="checkout-form" onSubmit={event => this.handleSubmit(event)}>
              <div id='shipping-info'>
                <h3>Shipping Information</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.shipName}
                  onChange={evt => {
                    this.setState({shipName: evt.target.value})
                  }}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={this.state.shipAddress}
                  onChange={evt => {
                    this.setState({shipAddress: evt.target.value})
                  }}
                />
                <input
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  value={this.state.shipPhone}
                  onChange={evt => {
                    this.setState({shipPhone: evt.target.value})
                  }}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={evt => {
                    this.setState({email: evt.target.value})
                  }}
                />
                <StripeCheckout
                  token={this.onToken}
                  stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
                />
              </div>
            </form>
            <div className='header'>
              <h3>Current Cart</h3>
              </div>
              <Cart/>
          </div>
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
    completeOrder: () => dispatch(deleteItemsInCart())
  }
}

export default connect(mapState, mapDispatch)(Checkout)
