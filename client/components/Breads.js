import React, {Component} from 'react'
import {connect} from 'react-redux'
import BreadIcon from './breadIcon'
import {breadSetter, breadGetter} from '../store/bread'
import {Link} from 'react-router-dom'
export class Breads extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchBreads()
  }
  render() {
    const breads = this.props.breads || []

    return (
      <>
        <h1>Breads Page</h1>
        <Link to="/category/French">French</Link>
        <br />
        <Link to="/category/Sourdough">Sourdough</Link>
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
