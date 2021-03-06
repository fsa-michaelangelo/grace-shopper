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
      warning: false
    }
  }

  componentDidMount() {
    this.props.getUser()
    this.setState({ warning: true })
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
      <>
        <div className='header'>
          <h2>Edit Account</h2>
        </div>
          <div id='edit-account'>
            <form>
                <div>
                  <label htmlFor="email">
                    <h5>Email </h5>
                    {!this.state.email && this.state.warning &&
                    <p className="warning"> (required)</p>}
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
                    <h5>Password </h5>
                    {!this.state.password && this.state.warning &&
                    <p className="warning"> (required)</p>}
                  </label>
                  <input
                    name="password"
                    type="password"
                    defaultValue={user.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='confirm'>
                    <h5>Confirm Password </h5>
                    {!this.state.password && this.state.warning &&
                    <p className="warning"> (required)</p>}
                  </label>
                  <input
                    name="confirm"
                    type="password"
                    onChange={this.handleChange}
                  />
                </div>
                  <div>
                    <label htmlFor="address">
                      <h5>Address</h5>
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
                      <h5>Phone</h5>
                    </label>
                    <input
                      name="phone"
                      type="text"
                      defaultValue={user.phone}
                      onChange={this.handleChange}
                    />
                </div>
            </form>
            <button onClick={this.handleSubmit} type="submit">Confirm</button>
          </div>
      </>
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
