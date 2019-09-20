import {
    LOGIN_SUCCESS
  } from '../actions/actionTypes'
  
  const initialState = {
    email: '',
    password: ''
  }
  
  const signupReducer = function (state = initialState, action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
      return ({
        ...state,
        email: action.data.email,
        password: action.data.password
      })
    default:
      return state
    }
  }
  
  export default signupReducer
  