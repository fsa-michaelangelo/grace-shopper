import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

import {fetchDetails} from '../store/single-order'

class SingleOrderDetails extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.getDetails(orderId)
  }

  render() {
    const order = this.props.order
    console.log(order)
    return (
      <>
        <div>Details here!</div>
        <div>Price: {order}</div>
        <Link to="/orders">
          <button>Back to my account</button>
        </Link>
      </>
    )
  }
}

const mapState = state => {
  return {
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    getDetails: id => dispatch(fetchDetails(id))
  }
}

export default connect(mapState, mapDispatch)(SingleOrderDetails)
