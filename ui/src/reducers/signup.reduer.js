import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  USER_LOGOUT,
} from '../actions/actionTypes'

const initialState = {
  isSignupSuccess: false,
  error: '',
}

const signup = function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return ({
        ...state,
        isSignupSuccess: true,
      })
      case SIGNUP_FAILED:
        return ({
          ...state,
          isSignupSuccess: false,
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

export default signup
