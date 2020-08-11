import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchOrders} from '../store/orders'

export class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    let orders = this.props.orders
    orders = orders.filter(order => order.status === 'complete')

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
                    <td>
                      {moment(order.createdAt)
                        .subtract(10, 'days')
                        .calendar()}
                    </td>
                    <td>
                      <Link to={`/orders/${order.id}`}>
                        View
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
