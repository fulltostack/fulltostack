import {
  SIGNUP_SUCCESS
} from '../actions/actionTypes'

const initialState = {
  email: '',
  password: '',
  name: '',
  description: ''
}

const signupReducer = function (state = initialState, action) {
  switch (action.type) {
  case SIGNUP_SUCCESS:
    return ({
      ...state,
      name: action.data.name,
      email: action.data.email,
      password: action.data.password
    })
  default:
    return state
  }
}

export default signupReducer
