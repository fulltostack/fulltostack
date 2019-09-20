import {
  LOGIN_SUCCESS
} from '../actions/actionTypes'
import { setTOLocalStorage } from '../utils'

const initialState = {
  email: '',
  password: ''
}

const signupReducer = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      setTOLocalStorage('token', action.data.token)
      return ({
        ...state,
        token: action.data.token,
        email: action.data.email,
        password: action.data.password
      })
    default:
      return state
  }
}

export default signupReducer
