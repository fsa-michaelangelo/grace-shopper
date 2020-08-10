  
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Cart from './cart'
import OrderHistory from './order-history'
import {set} from '../store/user'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <>
      <h3>Welcome, {user.email}</h3>
      <div id="account-details">
        <h3>Account Details</h3>
        <div>Email: {user.email}</div>
        <div>Address: {user.address}</div>
        <div>Phone Number: {user.phone}</div>
        <Link to='/edit'>Edit Account</Link>
      </div>
      <div className="current-order">
        <h4>Items in your cart</h4>
        <Cart />
      </div>
      <div className="order-history">
        <h3>Order History</h3>
        <OrderHistory user={user} />
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