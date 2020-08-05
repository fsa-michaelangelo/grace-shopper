import React from 'react'
import {connect} from 'react-redux'

import {fetchOrders} from '../store/orders'

export class OrderHistory extends React.Component {
  componentDidMount() {
    const user = this.props.user
    this.props.getOrders(user)
  }

  render() {
    const orders = this.props.orders

    return (
      <>
        {orders.map(order => {
          return (
            <div className="past-order" key={order.id}>
              <p>Date: {order.createdAt}</p>
            </div>
          )
        })}
      </>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: user => dispatch(fetchOrders(user))
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
