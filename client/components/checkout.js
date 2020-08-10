import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Redirect} from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

const promise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shipName: '',
      shipAddress: '',
      shipPhone: '',
      email: '',
      checked: false,
      billName: '',
      billAddress: '',
      billPhone: '',
      cc: '',
      exp: '',
      cvv: '',
      orderPlaced: false
    }
    this.handleCheck = this.handleCheck.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit(event) {
    event.preventDefault()
    this.setState({orderPlaced: true})
  }

  render() {
    const cart = this.props.cart

    if (this.state.orderPlaced === true) {
      alert('Your order is processing! Go check out some more bread!')
      return <Redirect to="/breads" />
    }

    return (
      <div className="App">
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      </div>
      // <>
      // <script src="https://js.stripe.com/v3/"></script>
      //   <form id="checkout-form" onSubmit={event => this.handleSubmit(event)}>
      //     <div>
      //       <h1>Checkout</h1>
      //       <h3>Shipping Information</h3>
      //       <input
      //         type="text"
      //         name="name"
      //         placeholder="Name"
      //         value={this.state.shipName}
      //         onChange={evt => {
      //           this.setState({shipName: evt.target.value})
      //         }}
      //       />
      //       <input
      //         type="text"
      //         name="address"
      //         placeholder="Address"
      //         value={this.state.shipAddress}
      //         onChange={evt => {
      //           this.setState({shipAddress: evt.target.value})
      //         }}
      //       />
      //       <input
      //         type="number"
      //         name="phone"
      //         placeholder="Phone"
      //         value={this.state.shipPhone}
      //         onChange={evt => {
      //           this.setState({shipPhone: evt.target.value})
      //         }}
      //       />
      //       <input type="text" name="email" placeholder="Email" />
      //     </div>
      //     <div>
      //       <h3>Billing Information</h3>
      //       <label>
      //         Same as Shipping
      //         <input
      //           name="sameAsShipping"
      //           type="checkbox"
      //           checked={this.state.checked}
      //           onChange={evt => {
      //             this.handleCheck(event)
      //           }}
      //         />
      //       </label>
      //       {this.state.checked === true ? (
      //         <>
      //           <input
      //             type="number"
      //             name="cc"
      //             placeholder="Credit Card Number"
      //             onChange={evt => {
      //               this.setState({cc: evt.target.value})
      //             }}
      //           />
      //           <input
      //             type="number"
      //             name="exp"
      //             placeholder="Exp"
      //             onChange={evt => {
      //               this.setState({exp: evt.target.value})
      //             }}
      //           />
      //           <input
      //             type="number"
      //             name="cvv"
      //             placeholder="CVV"
      //             onChange={evt => {
      //               this.setState({cvv: evt.target.value})
      //             }}
      //           />
      //           <button type="submit">Place Order</button>
      //         </>
      //       ) : (
      //         <>
      //           <input
      //             type="text"
      //             name="name"
      //             placeholder="Name"
      //             onChange={evt => {
      //               this.setState({billName: evt.target.value})
      //             }}
      //           />
      //           <input
      //             type="text"
      //             name="address"
      //             placeholder="Address"
      //             onChange={evt => {
      //               this.setState({billAddress: evt.target.value})
      //             }}
      //           />
      //           <input
      //             type="number"
      //             name="phone"
      //             placeholder="Phone"
      //             onChange={evt => {
      //               this.setState({billPhone: evt.target.value})
      //             }}
      //           />
      //           <input
      //             type="number"
      //             name="cc"
      //             placeholder="Credit Card Number"
      //             onChange={evt => {
      //               this.setState({cc: evt.target.value})
      //             }}
      //           />
      //           <input
      //             type="number"
      //             name="exp"
      //             placeholder="Exp"
      //             onChange={evt => {
      //               this.setState({exp: evt.target.value})
      //             }}
      //           />
      //           <input
      //             type="number"
      //             name="cvv"
      //             placeholder="CVV"
      //             onChange={evt => {
      //               this.setState({cvv: evt.target.value})
      //             }}
      //           />
      //           <button type="submit">Place Order</button>
      //         </>
      //       )}
      //     </div>
      //   </form>
      //   <>
      //     <h3>My Cart</h3>
      //     {/* <>
      //       {cart.map(item => {
      //         return (
      //           <div key={item.id}>
      //             <div>
      //               <div>{item.name}</div>
      //               <img src={item.imageUrl} />
      //               <p>{item.description}</p>
      //             </div>
      //             <div>Amount: {item.orderDetails.quantity}</div>
      //           </div>
      //         )
      //       })}
      //     </> */}
      //   </>
      //   <Elements stripe={promise}>
      //   <CheckoutForm />
      // </Elements>
      // </>
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
