import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleBread} from '../store/single-bread'
import {addItemToCart} from '../store/cart'

export class SingleBread extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }

  componentDidMount() {
    try {
      const id = this.props.match.params.id
      this.props.getSingleBread(id)
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: Number(event.target.value)
    })
  }

  render() {
    const bread = this.props.bread
    return (
      <div>
        <h1>{bread.name}</h1>
        <img src={bread.imageUrl} />
        <h6>{bread.description}</h6>
        <h5>Price: ${bread.price}</h5>
        {bread.quantity > 0 ? (
          <div onChange={this.handleChange}>
            <input type="number" name="quantity" placeholder="Qty" />
            <button
              onClick={() => {
                this.props.addItemToCart(
                  bread,
                  this.state.quantity,
                  bread.price
                )
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
