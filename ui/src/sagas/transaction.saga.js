import {
  takeEvery,
  put,
  call
} from 'redux-saga/effects';
import { postRequest, getRequest } from '../utils/api';
import { getLocalStorage } from '../utils';
import {
  CREATE_TRANSACTION,
  GET_TRANSACTION,
  createTransactionSuccess,
  createTransactionFailed,
  getTransactionSuccess,
  getTransactionFailed,
  resetCreateTransaction,
} from '../actions/transaction.actions';
import { 
  addTransaction, 
  getTransactions, 
  AUTHENTICATION_TOKEN, 
} from '../constants/config';

function* addTransactionReq(action) {
  try {
    const authorizationHeader = {
      Authorization: `Bearer ${getLocalStorage(AUTHENTICATION_TOKEN)}` 
    };
    
    const response = yield call(
      postRequest, 
      addTransaction, 
      {
        currency_amount: action.payload.amount,
        currency_type: action.payload.blockchain,
        to_address: action.payload.toAddress,
      }, 
      authorizationHeader,
    );
    yield put(createTransactionSuccess(response));
    yield put(resetCreateTransaction(response));
  } catch (err) {
    yield put(createTransactionFailed(err.message));
  }
}

function* getTransactionReq() {
  try {
    const authorizationHeader = {
      Authorization: `Bearer ${getLocalStorage(AUTHENTICATION_TOKEN)}` 
    };
    const response = yield call(getRequest, getTransactions, authorizationHeader)
    yield put(getTransactionSuccess(response))
  } catch (err) {
    yield put(getTransactionFailed(err.message))
  }
}

export default [
  takeEvery(CREATE_TRANSACTION, addTransactionReq),
  takeEvery(GET_TRANSACTION, getTransactionReq)
];
