import React, {Component} from 'react'
import {breadSetter, breadGetter} from '../store/bread'

export class Breads extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}
  handleSubmit(event) {
    event.preventDefault()
    try {
      this.props.addCampus(this.state)
    } catch (err) {
      next(err)
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const breads = this.props.breads
    return (
      <div>
        <h1>Breads Page</h1>
        <h3>Filter Search:</h3>
        <form onSubmit={this.handleSubmit} id="search">
          <input type="text" name="name" onChange={this.handleChange} />
        </form>
        <div className="items">
          {breads.map((bread, index) => (
            <breadIcon key={index} bread={bread} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    breads: state.breads
  }
}

const mapDispatchToState = dispatch => {
  return {
    fetchBreads: () => dispatch(breadGetter())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Breads)
