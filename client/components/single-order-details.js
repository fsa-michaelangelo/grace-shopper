import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

//import {fetchOrders} from '../store/orders'
import {fetchOrderDetails} from '../store/single-order'

class SingleOrderDetails extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.getOrderDetails(orderId)
  }

  render() {
    const order = this.props.order
    const bread = order.bread || []
    let orderTotal = 0

    return (
      <>
        <div id="single-order-details">
          <h3>Order #{order.id}</h3>
          <h4>Purchase date:</h4>
          <div>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
          <h4>Purchased Items:</h4>
          <table>
            <tbody>
              <tr>
                <th>Bread</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
              {bread.map(bread => {
                orderTotal += (bread.orderDetails.quantity * bread.orderDetails.price)
                return (
                  <tr key={bread.id}>
                    <td>{bread.name}</td>
                    <td>${bread.orderDetails.price}</td>
                    <td>{bread.orderDetails.quantity}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <h3>Total: ${orderTotal}</h3>
          <Link to="/home">
            Back to my account
          </Link>
        </div>
      </>
    )
  }
}

const mapState = state => {
  return {
    order: state.singleOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getOrderDetails: id => dispatch(fetchOrderDetails(id))
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleOrderDetails))
