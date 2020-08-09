import React, {Component} from 'react'
import {connect} from 'react-redux'
import BreadIcon from './breadIcon'
import {breadSetter, breadGetter} from '../store/bread'

export class Breads extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount() {
    this.props.fetchBreads()
  }

  //for future search functionality

  // handleSubmit(event) {
  //   event.preventDefault()
  //   try {
  //     this.props.addCampus(this.state)
  //   } catch (err) {
  //     next(err)
  //   }
  // }

  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  render() {
    const breads = this.props.breads || []

    return (
      <>
        <div className="header">
          <h1>BREADS</h1>
          <div className="search">
            <form onSubmit={this.handleSubmit} id="search">
              <label>Search:</label>
              <input type="text" name="name" onChange={this.handleChange} />
            </form>
          </div>
        </div>
        <div className="items">
          {breads.map(bread => <BreadIcon key={bread.id} bread={bread} />)}
        </div>
      </>
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
