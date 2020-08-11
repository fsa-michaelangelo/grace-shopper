import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SingleBread from './single-bread'
import {removeCartItem} from '../store/cart'

const GuestCart = props => {
  const cart = props.cart
  let cartTotal = 0
  return (
    <>
      <div>
        {cart ? (
          cart.map((item, index) => {
            cartTotal += (item.quantity * item.price)
            return (
              <div key={index}>
                <div>
                  <div>{item.bread.name}</div>
                  <img src={item.bread.imageUrl} />
                  <p>{item.bread.description}</p>
                </div>
                <div onChange={props.handleChange}>
                  <input
                    type="number"
                    name="quantity"
                    placeholder={Number(item.quantity)}
                  />
                </div>
                <div>
                  <p> price: ${item.price}</p>
                </div>
                <button
                  onClick={() => {
                    props.removeItem(item.bread)
                  }}
                >
                  Remove item from cart
                </button>
                <>
                  <Link to={`/breads/${item.bread.id}`} component={SingleBread}>
                    Need to change the amount?
                  </Link>
                </>
                <h3>Total: ${cartTotal}</h3>
              </div>
            )
          })
        ) : (
          <h1>Any way you slice it there's nothin here...</h1>
        )}
      </div>
    </>
  )
}

const mapDispatch = dispatch => {
  return {
    removeItem: bread => dispatch(removeCartItem(bread))
  }
}

export default connect(null, mapDispatch)(GuestCart)
