import { combineReducers } from 'redux'
import getallReducer from './eips/getallReducer'

const rootReducer = combineReducers({
  getAll: getallReducer
})

export default rootReducer