import React, {Component} from 'react'
import {connect} from 'react-redux'
import BreadIcon from './breadIcon'
import {breadGetter} from '../store/bread'
import {breadGroup} from '../store/bread'
//import {Link} from 'react-router-dom'

export class Breads extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange = () => {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchGroup(this.state.value)
    console.log('state value inside of handlesubmit: ', this.state.value)

    //this.props.history.push(`/category/${this.state.value}`)

    // this.setState({
    //   value: 'Category'
    // })
  }

  componentDidMount() {
    this.props.fetchBreads()
  }
  render() {
    const breads = this.props.breads || []

    return (
      <>
        <div className='header'>
          <h1>Breads</h1>
        </div>
        <select
          value={this.state.value}
          id="category-search"
          onChange={this.handleChange}>
            <option>Category</option>
          {
            breads.map(bread => (
              <option
                key={bread.id}
                className="category"
                value={bread.name}
                >
                  {bread.name}
              </option>)
            )
          }
        </select>
        <button type="submit" onClick={this.handleSubmit}>Search</button>
        <div className="all-breads">
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
    fetchBreads: () => dispatch(breadGetter()),
    fetchGroup: (name) => dispatch(breadGroup(name))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Breads)
