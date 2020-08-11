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
        <div className='header'>
          <h1>Breads</h1>
        </div>
        <div id="category-search">
          {
            breads.map(bread => (
              <div className="category">
                <Link
                  key={bread.id}
                  to={`/category/${bread.name}`}>
                    {bread.name}
                </Link>
              </div>)
            )
          }
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
