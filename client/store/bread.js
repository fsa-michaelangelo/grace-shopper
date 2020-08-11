import axios from 'axios'
//import history from '../history'


const GET_BREADS = 'GET_BREADS'
const GET_GROUP = 'GET_GROUP'

export const getBread = breads => {
  return {
    type: GET_BREADS,
    breads
  }
}

export const getGroup = (group) => {
  return {
    type: GET_GROUP,
    group
  }
}

export const breadGetter = () => async dispatch => {
  try {
    const res = await axios.get('/api/breads')
    dispatch(getBread(res.data))
  } catch (err) {
    next(err)
  }
}
export const breadGroup = (name) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/breads/group/${name}`)
    dispatch(getGroup(data))
  } catch (err) {
    console.error(err)
  }
}


const initState = []

export default function(state = initState, action) {
  switch (action.type) {
    case GET_BREADS:
      return action.breads
    case GET_GROUP:
      return action.group
    default:
      return state
  }
}
