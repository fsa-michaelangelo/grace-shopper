import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, set, update} from '../store/user'
import axios from 'axios'
export class account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirm: '',
      err: false,
      success: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getUser()
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    if(this.state.password === this.state.confirm){
      this.setState({err: false})
      console.log('id should be ', this.props.user.id)
      // this.setState({
        //   ...this.state,
        //   success: true
        // })
        await axios.put(
          `/auth/${this.props.user.id}`,
          this.state
          ) 
        // this.props.setUser()
        // this.props.render(this.props.user.id)
        } else {
          this.setState({err: true})
      // this.state.err = true
      // this.state.success = false

    }
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
    setUser: (user) => dispatch(set(user)),
    render: (user) => dispatch(update(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(account)
