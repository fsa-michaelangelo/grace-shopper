import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import OrderHistory from './order-history'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <>
      <h3>Welcome, {user.email}</h3>
      <Link to="/edit">Edit Account</Link>
      <div id="account-details">
        <h3>Account Details</h3>
        <div>Email: {user.email}</div>
        <div>Address: {user.address}</div>
        <div>Phone Number: {user.phone}</div>
        <button type="button">Edit</button>
      </div>
      <div className="current-order">
        {/*if there is a current cart, render it. otherwise...*/}
        <h5>Nothing in your cart at this time</h5>
      </div>
      <div className="order-history">
        <h3>Order History</h3>
        <OrderHistory user={user} />
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
