import React, {Component} from 'react'
import {connect} from 'react-redux'
import BreadIcon from './breadIcon'
import {breadGroup} from '../store/bread'

export class BreadCategory extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchGroup()
  }
  render() {
    const name = this.props.match.params.name

    const breads = this.props.breads || []
    console.log(breads)

    return <h1>Hello</h1>
  }
}

const mapStateToProps = state => {
  return {
    breads: state.breads
  }
}

const mapDispatchToState = dispatch => {
  return {
    fetchGroup: () => dispatch(breadGroup())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(BreadCategory)