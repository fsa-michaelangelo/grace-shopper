import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, set, update} from '../store/user'
import axios from 'axios'


export class Account extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirm: '',
      err: false,
      success: false
    }
  }


  componentDidMount() {
    this.props.getUser()
  }


 handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.updateUser({...this.state, id: this.props.user.id})
    this.props.history.push('/home')
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    const user = this.props.user
    return (
      <div>
        <h2>Edit Account</h2>
        <div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input
                  name="email"
                  type="text"
                  defaultValue={user.email}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input
                  
                  name="password"
                  type="password"
                  defaultValue={user.password}
                  onChange={this.handleChange}
                />
              </div>
                <div>
                  <label htmlFor="address">
                    <small>Address</small>
                  </label>
                  <input
                    name="address"
                    type="text"
                    defaultValue={user.address}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone">
                    <small>Phone</small>
                  </label>
                  <input
                    name="phone"
                    type="text"
                    defaultValue={user.phone}
                    onChange={this.handleChange}
                  />
              </div>
              <div>
                <label htmlFor='confirm'>
                  <small>Confirm Password</small>
                </label>
                <input 
                  name="confirm"
                  type="password"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
            <div>
              {this.state.err ? <h3>Passwords do not match</h3> : null }
            </div>
            <div>
              {this.state.success ? <h4>Account Updated!</h4> : <h4>Not succeeding</h4>}
            </div>
          </div>
        </div>
      </div> 
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(me()),
    updateUser: (user) => dispatch(update(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
