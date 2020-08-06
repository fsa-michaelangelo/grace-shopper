export const SET_SINGLE_BREAD = 'SET_SINGLE_BREAD'
import axios from 'axios'

export const setSingleBread = bread => {
  // console.log(bread)
  return {
    type: SET_SINGLE_BREAD,
    bread
  }
}

export const fetchSingleBread = id => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/breads/${id}`)
      dispatch(setSingleBread(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

export default function singleBreadReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_BREAD:
      return action.bread
    default:
      return state
  }
}
