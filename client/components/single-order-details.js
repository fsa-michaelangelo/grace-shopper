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
    //console.log('order: ', this.props.order)
    return (
      <div>
        <div>Details here!</div>
        <div>Price: {order}</div>
        <Link to="/home">
          <button>Back to my account</button>
        </Link>
      </div>
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
