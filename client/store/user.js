import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
//trial 1
export const me = () => async dispatch => {
  try {
    console.log('in the me thunk')
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
//trial 2
export const set = user => async dispatch => {
  try {
    const updatedUser = user
    console.log('updated user in set ', updatedUser)
    // const updatedUser = await axios.get(`/auth/set/${id}`)
    dispatch(getUser(updatedUser))
  } catch (err) {
    console.log(err)
  }
}
export const update = id => async dispatch => {
  try {
    console.log('update thunk user ', id)
    const user = await axios.put(`/auth/${id}`)
    dispatch(getUser(user))
    //update users
  } catch (err) {
    console.log(err)
  }
}
export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const defaultUser = {
  user: []
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  console.log('user in reducer ', action.user)
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
