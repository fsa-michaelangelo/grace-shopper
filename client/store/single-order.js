import axios from 'axios'

const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS'

const getOrderDetails = singleOrder => {
  return {
    type: GET_ORDER_DETAILS,
    singleOrder
  }
}

export const fetchOrderDetails = id => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/orders/${id}`)
      dispatch(getOrderDetails(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_DETAILS:
      return action.singleOrder
    default:
      return state
  }
}
