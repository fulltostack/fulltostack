import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
  } from '../actions/actionTypes';
  
  const initialState = {
    isLoginSuccess: false,
    error: '',
  }
  
  const login = function (state = initialState, action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return ({
          ...state,
          isLoginSuccess: true,
        })
      case LOGIN_FAILED:
        return ({
          ...state,
          isLoginSuccess: false,
          error: action.error,
        })
    default:
      return state
  }
}
  
export default login