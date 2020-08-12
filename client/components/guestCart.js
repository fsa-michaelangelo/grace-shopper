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
              <div className='cart-item' key={index}>
                <div>
                  <img src={item.bread.imageUrl} />
                </div>
                <div className='cart-details'>
                  <h4>{item.bread.name}</h4>
                  <p>{item.bread.description}</p>
                  <p>Price: ${item.price}</p>
                <div className='quantity'>
                  Quantity: {Number(item.quantity)}
                  <Link to={`/breads/${item.bread.id}`} component={SingleBread}>
                    <sub>Change amount?</sub>
                  </Link>
                </div>
                <button
                  onClick={() => {
                    props.removeItem(item.bread)
                  }}>
                  Remove from cart
                </button>
                </div>
              </div>
            )
          })
        ) : (
          <div className='header'>
            <h3>Any way you slice it there's nothin here...</h3>
          </div>
        )}
          <div className='checkout'>
            <h3>Total: ${cartTotal}</h3>
          </div>
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
