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
    const res = await axios.get('/api/breads')
    dispatch(breadSetter(res.data))
  } catch (err) {
    next(err)
  }
}
export const breadGroup = (name) => async dispatch => {
  console.log('thunk name is ', name)
  try {
    const { data } = await axios.get(`/api/breads/group/${name}`)
    dispatch(breadSetter(data))
  } catch (err) {
    console.log(err)
  }
}
//reducer

const initState = []

export default function(state = initState, action) {
  switch (action.type) {
    case GET_BREADS:
      return action.breads
    default:
      return state
  }
}
