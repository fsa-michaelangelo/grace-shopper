import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import cart from './cart'
import user from './user'
import singleBread from './single-bread'
import orders from './orders'
import breads from './bread'

const reducer = combineReducers({user, orders, breads, singleBread, cart})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './single-bread'
