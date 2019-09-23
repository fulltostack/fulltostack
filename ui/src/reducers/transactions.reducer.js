import {
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAILED,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILED,
  RESET_CREATE_TRANSACTION,
} from '../actions/transaction.actions'
import { USER_LOGOUT } from '../actions/actionTypes';

const initialState = {
  transactions: [],
  isTransactionSuccess: false,
  error: '',
}

const transactions = function (state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTION_SUCCESS:
      return ({
        ...state,
        transactions: action.data.transactions.map(tx => ({
          blockchain: tx.currency_type,
          from: tx.from_address,
          to: tx.to_address,
          amount: tx.currency_amount,
          state: tx.state,
          txId: tx.id,
        })),
      })
      case GET_TRANSACTION_FAILED:
        return ({
          ...state,
          error: action.error,
        })
      case CREATE_TRANSACTION_SUCCESS:
        return ({
          ...state,
          isTransactionSuccess: true,
        })
      case RESET_CREATE_TRANSACTION:
        return ({
          ...state,
          isTransactionSuccess: false,
          error: '',
        })
      case CREATE_TRANSACTION_FAILED:
        return ({
          ...state,
          isTransactionSuccess: false,
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

export default transactions
