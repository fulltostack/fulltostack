import { combineReducers } from 'redux'
import signupReducer from './signup.reduer'
import loginReducer from './login.reducer'

export default combineReducers({
  signupReducer,
  loginReducer
})
