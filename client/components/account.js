import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import axios from 'axios'
export class account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getUser()
    console.log('the props are ', this.props)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const res = axios.put(`/auth/${this.props.user.id}`, this.state)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    // this.props.getUser()
  }
  render() {
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
                  placeholder="new email"
                  type="text"
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
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
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
    getUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(account)
