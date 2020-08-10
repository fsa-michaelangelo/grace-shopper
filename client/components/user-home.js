import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import OrderHistory from './order-history'
import {set, me} from '../store/user'
import axios from 'axios'

import {Component} from 'react'

export class UserHome extends Component {
  constructor(props) {
    super(props)
  }


  async componentDidMount() {
    const user2 = await axios.get('/auth/me')
    // this.props.user2 = user2.body
    this.user2 = user2.data
    console.log('user2 ', this.user2)
    
  }


  render() {
    const {user} = this.props
    const user2 = this.user2
    console.log('user2 in render ', this.user2)
    
    return (
      <div>
        <h3>Welcome, {user.email}</h3>
        <Link to={{pathname: '/edit', user: user}}>Edit Account</Link>
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
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}
const dispatchToProps = dispatch => {
  return {
    // // updateUser: () => dispatch(set(id))
    // getUser: () => dispatch()
  }
}

export default connect(mapState, dispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
