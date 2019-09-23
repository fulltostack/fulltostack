import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOGOUT,
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
      case USER_LOGOUT:
        return ({
          ...state,
          ...initialState,
        })
    default:
      return state
  }
}
  
export default login