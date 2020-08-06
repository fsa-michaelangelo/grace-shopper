import Redux from 'redux'
import Axios from 'axios'

const localState = []

/////ACTION TYPES////
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const EMPTY_CART = 'EMPTY_CART'
const GET_CART = 'GET_CART'

///ACTION CREATORS///
export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const setCart = (bread, quantity) => ({
  type: ADD_TO_CART,
  bread,
  quantity
})

export const removeItemInCart = bread => ({
  type: REMOVE_FROM_CART,
  bread
})

export const emptyCart = () => ({
  type: EMPTY_CART
})

/////THUNKS/////
export const fetchCart = () => {
  return async function(dispatch) {
    try {
      const {data} = await Axios.get('/api/cart/')
      dispatch(getCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addItemToCart = bread => {
  return async function(dispatch) {
    try {
      const {data} = await Axios.put('/api/cart/', bread)
      dispatch(setCart(bread))
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeCartItem = bread => {
  return async function(dispatch) {
    try {
      const {data} = await Axios.delete('/api/cart/', bread)
      dispatch(removeItemInCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteItemsInCart = () => {
  return async function(dispatch) {
    try {
      const {data} = await Axios.delete('/api/cart/')
      dispatch(emptyCart())
    } catch (err) {
      console.log(err)
    }
  }
}

export default (state = localState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, {bread: action.bread, quantity: action.quantity}]
    case REMOVE_FROM_CART:
      return state.filter(item => item.bread.id !== action.bread.id)
    case EMPTY_CART:
      return localState
    default:
      return state
  }
}
