import React from 'react'
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

    return (
      <>
        <h3>Order {order.id} Details</h3>
        <table>
          <tbody>
            <tr>
              <th>Bread</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            {bread.map(bread => {
              return (
                <tr key={bread.id}>
                  <td>{bread.name}</td>
                  <td>{bread.orderDetails.price}</td>
                  <td>{bread.orderDetails.quantity}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Link to="/home">
          <button>Back to my account</button>
        </Link>
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
