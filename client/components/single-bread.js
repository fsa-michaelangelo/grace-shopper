import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleBread} from '../store/single-bread'

export class SingleBread extends React.Component {
  componentDidMount() {
    try {
      const id = this.props.match.params.id
      this.props.getSingleBread(id)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const bread = this.props.bread
    return (
      <div className="single-page">
        <h1>{bread.name}</h1>
        <div className="single-page-row">
          <img src={bread.imageUrl} />
          <div className="single-page-info">
            <p>{bread.description}</p>
            <h5>Price: ${bread.price}</h5>
            {bread.quantity > 0 ? (
              <div className="add-to-cart">
                <input type="number" name="qty" placeholder="Qty" />
                <h5>Add to cart</h5>
              </div>
            ) : (
              <h5>Sold out!</h5>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {bread: state.singleBread}
}

const mapDispatch = dispatch => {
  return {
    getSingleBread: id => dispatch(fetchSingleBread(id))
  }
}

export default connect(mapState, mapDispatch)(SingleBread)
