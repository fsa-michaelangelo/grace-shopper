import React, {Component} from 'react'
import {connect} from 'react-redux'
import BreadIcon from './breadIcon'
import {breadGroup} from '../store/bread'

export class BreadCategory extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.name)
  }
  render() {
    const breads = this.props.breads || []
    console.log('breads ', breads)
    return (
    <div>
    {
      breads.map((bread) => <BreadIcon key={bread.id} bread={bread}/>)
    }
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
    fetchGroup: (name) => dispatch(breadGroup(name))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(BreadCategory)
