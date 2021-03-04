import { createStore, combineReducers  } from 'redux'
import listReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: listReducer,
  notifications: notificationReducer,
  filter: filterReducer,
})

const store = createStore(reducer)

export default store;