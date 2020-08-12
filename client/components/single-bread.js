import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleBread} from '../store/single-bread'
import {addItemToCart} from '../store/cart'

export class SingleBread extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
      msg: false
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

  toggleAdded = () => {
    this.setState({ msg: true })
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
              <div onChange={this.handleChange} className="add-to-cart">
                <input type="number" name="quantity" placeholder="Qty" />
                <button
                  onClick={() => {
                    this.props.addItemToCart(
                      bread,
                      this.state.quantity,
                      bread.price
                    ), this.toggleAdded()
                  }}
                  >
                  Add to cart
                </button>
                <div>
                  { this.state.msg ? 'Added to cart!' : '' }
                </div>
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
    getSingleBread: id => dispatch(fetchSingleBread(id)),
    addItemToCart: (bread, quantity, price) =>
      dispatch(addItemToCart(bread, quantity, price))
  }
}

export default connect(mapState, mapDispatch)(SingleBread)
