import axios from 'axios'

const GET_DETAILS = 'GET_DETAILS'

const getDetails = order => {
  return {
    type: GET_DETAILS,
    order
  }
}

export const fetchDetails = id => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/orders/${id}`)
      dispatch(getDetails(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS:
      return action.order
    default:
      return state
  }
}
