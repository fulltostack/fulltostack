import {
  CREATE_WALLET_SUCCESS,
  CREATE_WALLET_FAILED,
  RESET_CREATE_WALLET,
} from '../actions/wallet.actions'
import { USER_LOGOUT } from '../actions/actionTypes';

const initialState = {
  isWalletCreated: false,
  error: '',
};

const wallet = function (state = initialState, action) {
  switch (action.type) {
      case CREATE_WALLET_SUCCESS:
        return ({
          ...state,
          isWalletCreated: true,
        })
      case RESET_CREATE_WALLET:
        return ({
          ...state,
          isWalletCreated: false,
          error: '',
        })
      case CREATE_WALLET_FAILED:
        return ({
          ...state,
          isWalletCreated: false,
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
};

export default wallet;
