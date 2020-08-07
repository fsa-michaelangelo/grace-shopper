import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      phone: '',
      checked: false
    }
    this.handleCheck = this.handleCheck.bind(this)
  }

  componentDidMount() {
    try {
      this.props.fetchCart()
      console.log(this.props.cart)
    } catch (error) {
      console.log(error)
    }
  }

  handleCheck(event) {
    if (this.state.checked === false) {
      this.setState({checked: true})
    } else if (this.state.checked === true) {
      this.setState({checked: false})
    }
  }

  render() {
    const cart = this.props.cart
    return (
      <>
        <div>
          <h1>Checkout</h1>
          <h3>Shipping Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={evt => {
              this.setState({name: evt.target.value})
            }}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={this.state.address}
            onChange={evt => {
              this.setState({address: evt.target.value})
            }}
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            value={this.state.phone}
            onChange={evt => {
              this.setState({phone: evt.target.value})
            }}
          />
          <input type="text" name="email" placeholder="Email" />
        </div>
        <div>
          <h3>Billing Information</h3>
          <label>
            Same as Shipping
            <input
              name="sameAsShipping"
              type="checkbox"
              checked={this.state.checked}
              onChange={evt => {
                this.handleCheck(event)
              }}
            />
          </label>
          {this.state.checked === true ? (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={evt => {
                  this.setState({name: evt.target.value})
                }}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={this.state.address}
                onChange={evt => {
                  this.setState({address: evt.target.value})
                }}
              />
              <input
                type="number"
                name="phone"
                placeholder="Phone"
                value={this.state.phone}
                onChange={evt => {
                  this.setState({phone: evt.target.value})
                }}
              />
              <input type="number" name="cc" placeholder="Credit Card Number" />
              <input type="number" name="exp" placeholder="Exp" />
              <input type="number" name="cvv" placeholder="CVV" />
              <button type="submit">Place Order</button>
            </>
          ) : (
            <>
              <input type="text" name="name" placeholder="Name" />
              <input type="text" name="address" placeholder="Address" />
              <input type="number" name="phone" placeholder="Phone" />
              <input type="number" name="cc" placeholder="Credit Card Number" />
              <input type="number" name="exp" placeholder="Exp" />
              <input type="number" name="cvv" placeholder="CVV" />
              <button type="submit">Place Order</button>
            </>
          )}
        </div>
        <>
          <h3>My Cart</h3>
          <>
            {cart.map(item => {
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
            })}
          </>
        </>
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
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Checkout)
