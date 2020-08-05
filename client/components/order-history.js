import React from 'react'
import {connect} from 'react-redux'

export const OrderHistory = props => {
  console.log(props.user)
  return <div>Render past orders here</div>
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(OrderHistory)
