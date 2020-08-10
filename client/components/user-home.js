import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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
          <button type="button">Edit info</button>
          {/*if there is a current cart, render it. otherwise...*/}
          <h4>You don't have anything in your cart.</h4>
        </div>
        <div className="order-history">
          <h3>Order History</h3>
          <OrderHistory user={user} />
        </div>
      </div>
    </>
  )
}

/**
 * CONTAINER
 */
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
