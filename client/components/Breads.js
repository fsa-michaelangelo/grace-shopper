import React, {Component} from 'react'
import {connect} from 'react-redux'
import BreadIcon from './breadIcon'
import {breadSetter, breadGetter} from '../store/bread'
import {Link} from 'react-router-dom'
export class Breads extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount() {
    this.props.fetchBreads()
  }

  render() {
    const breads = this.props.breads || []

    return (
      <>
        <div className="header">
          <h1>Breads</h1>
        </div>
        <div className="search">
          <h3>Search by Category:</h3>
          <Link to="/category/French">French</Link>
          <br />
          <Link to="/category/Sourdough">Sourdough</Link>
          <form id="search" onSubmit={this.handleSubmit}>
          </form>
        </div>
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
    fetchBreads: () => dispatch(breadGetter())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Breads)
