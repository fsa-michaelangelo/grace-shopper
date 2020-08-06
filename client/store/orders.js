import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

export const fetchOrders = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/orders/')
      dispatch(getOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
