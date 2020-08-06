import axios from 'axios'
import history from '../history'

//action creator
const GET_BREADS = 'GET_BREADS'

export const breadSetter = breads => {
  return {
    type: GET_BREADS,
    breads
  }
}
//thunk
export const breadGetter = () => async dispatch => {
  try {
    const res = await axios.get('/api/breads/')
    dispatch(breadSetter(res.data))
  } catch (err) {
    next(err)
  }
}
//reducer

const initState = {
  breads: []
}
export default function bread(state = initState, action) {
  switch (action.type) {
    case GET_BREADS:
      return {
        breads: action.breads
      }
    default:
      return state
  }
}
