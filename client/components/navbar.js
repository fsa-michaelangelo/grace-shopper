import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
//import {cart} from './cart'
//import

const Navbar = ({handleClick, isLoggedIn}) => (
  <>
    <nav>
      {isLoggedIn ? (
        <>
          {/* The navbar will show these links after you log in */}
          <div className="left-nav-container">
            <Link to="/">Home</Link>
            <Link to="/breads">Breads</Link>
          </div>
          <div className="right-nav-container">
            <img className="icon" src="./cart.jpg" />
            {/* <Link to="/cart">
                      <img className="icon" src='./cart.jpg' />
                </Link> */}
            <Link to="/home">My Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </>
      ) : (
        <>
          {/* The navbar will show these links before you log in */}
          <div className="left-nav-container">
            <Link to="/">Home</Link>
            <Link to="/breads">Breads</Link>
          </div>
          <div className="right-nav-container">
            <img className="icon" src="./cart.jpg" />
            {/* <Link to="/cart">
                    <img className="icon" src='./cart.jpg' />
              </Link> */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </>
      )}
    </nav>
    <hr />
  </>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
