import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleBread} from '../store/single-bread'
import {addItemToCart} from '../store/cart'

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
      <div>
        <img src="./sourdough.jpg" />
        <h1>{bread.name}</h1>
        <img src={bread.imageUrl} />
        <h6>{bread.description}</h6>
        <h5>Price: ${bread.price}</h5>
        {bread.quantity > 0 ? (
          <div>
            <input type="number" name="qty" placeholder="Qty" />
            <button
              onClick={() => {
                this.props.addItemToCart(bread, event.target.value, bread.price)
              }}
            >
              Add to cart
            </button>
          </div>
        ) : (
          <h5>Sold out!</h5>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {bread: state.singleBread}
}

const mapDispatch = dispatch => {
  return {
    getSingleBread: id => dispatch(fetchSingleBread(id)),
    addItemToCart: (bread, quantity, price) =>
      dispatch(addItemToCart(bread, quantity, price))
  }
}

export default connect(mapState, mapDispatch)(SingleBread)
