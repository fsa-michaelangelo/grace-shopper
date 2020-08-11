
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Cart from './cart'
import OrderHistory from './order-history'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <>
      <div className="header">
        <h3>Welcome, {user.email}</h3>
      </div>
      <div id="user-home">
        <div id="account-details">
          <div id="account-info">
            <h3>Account Details</h3>
            <h4>Email</h4>
            <div>{user.email}</div>
            <h4>Address</h4>
            <div>{user.address}</div>
            <h4>Phone</h4>
            <div>{user.phone}</div>
          </div>
          <Link to='/edit'>Edit info</Link>
        </div>
        <div className="order-history">
          <h3>Order History</h3>
          <OrderHistory user={user} />
        </div>
      </div>
      <div className="current-order">
          <h4>Items in your cart</h4>
        <Cart />
      </div>
    </>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}


export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
