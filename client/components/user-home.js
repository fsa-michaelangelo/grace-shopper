import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import OrderHistory from './order-history'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props
  //console.log(user)

  return (
    <>
      <h3>Welcome, {user.email}</h3>
      <div id="account-details">
        <h4>Account Details</h4>
        <div>Email: {user.email}</div>
        <div>Address: {user.address}</div>
        <div>Phone Number: {user.phone}</div>
        <button type="button">Edit</button>
      </div>
      <div className="order-history">
        <h2>Order History</h2>
        <OrderHistory />
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
