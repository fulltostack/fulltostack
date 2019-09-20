import { combineReducers } from 'redux'
import signup from './signup.reduer'
import login from './login.reducer'

export default combineReducers({
  signup,
  login,
})
