import React from 'react'
import {connect} from 'react-redux'

import {fetchOrders} from '../store/orders'

export class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    const orders = this.props.orders

    return (
      <>
        {orders.length ? (
          orders.map(order => {
            return (
              <div className="past-order" key={order.id}>
                <p>Date: {order.createdAt}</p>
              </div>
            )
          })
        ) : (
          <h5>No past orders to display</h5>
        )}
      </>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
