import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
          <table>
            <tbody>
              <tr>
                <th>Order No.</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
              {orders.map(order => {
                return (
                  <tr className="past-order" key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.createdAt}</td>
                    <td>
                      <Link to={`/orders/${order.id}`}>
                        <button>View</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
