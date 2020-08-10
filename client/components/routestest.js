import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Login,
  Signup,
  UserHome,
  OrderHistory,
  SingleOrderDetails,
  Homepage,
  Breads,
  SingleBread,
  Account,
  Category
} from './components'

import {me} from './store'

import UserHome from './components/user-home'

import {SingleBread} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    console.log('route props ', this.props)
    const {isLoggedIn} = this.props
    const user = this.props.user

    //REMEMBER TO ADD all components to ./components exports
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Homepage} />
        {/*<Route exact path="/cart" component={Cart} />
        <Route exact path="/cart/checkout" component={Checkout} */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/breads" component={Breads} />
        <Route path="/category/:name" component={Category} />
        <Route
          exact
          path="/edit"
          render={props => <Account {...props} user={user} />}
        />
        <Route path="/breads/:id" component={SingleBread} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/orders" component={OrderHistory} />
            <Route path="/orders/:orderId" component={SingleOrderDetails} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}