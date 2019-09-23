import {
  GET_MY_DETAILS_SUCCESS,
  GET_MY_DETAILS_FAILED,
} from '../actions/user.actions'
import { USER_LOGOUT } from '../actions/actionTypes';

const initialState = {
  wallets: [],
  email: '',
  name: '',
  transactionMax: 0,
  error: '',
}

const user = function (state = initialState, action) {
  switch (action.type) {
    case GET_MY_DETAILS_SUCCESS:
      return ({
        ...state,
        wallets: [
          {
            blockchain: 'BTC',
            address: action.data.btc_address,
            balance: action.data.btc_balance,
          },
          {
            blockchain: 'ETH',
            address: action.data.eth_address,
            balance: action.data.eth_balance,
          }
        ],
        email: action.data.email,
        name: action.data.name,
        transactionMax: action.data.transaction_max,
      })
      case GET_MY_DETAILS_FAILED:
        return ({
          ...state,
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

export default user
