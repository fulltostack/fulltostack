import {
  takeEvery,
  put,
  call
} from 'redux-saga/effects'
import { postRequest } from '../utils/api'
import { getLocalStorage } from '../utils'
import {
  CREATE_WALLET,
  createWalletSuccess,
  createWalletFailed,
  resetCreateWallet,
} from '../actions/wallet.actions'
import { 
  addWallet, 
  AUTHENTICATION_TOKEN, 
} from '../constants/config'

const btcReqBody = payload => ({
  btc_address: payload.address, 
  btc_balance: payload.balance,
});

const ethReqBody = payload => ({
  eth_address: payload.address, 
  eth_balance: payload.balance,
});

const reqBody = {
  ETH: ethReqBody,
  BTC: btcReqBody,
};

function* addWalletReq(action) {
  try {
    const authorizationHeader = {
      Authorization: `Bearer ${getLocalStorage(AUTHENTICATION_TOKEN)}` 
    };

    const response = yield call(
      postRequest, 
      addWallet(action.payload.blockchain), 
      reqBody[action.payload.blockchain](action.payload), 
      authorizationHeader,
    );
    yield put(createWalletSuccess(response));
    yield put(resetCreateWallet(response));
  } catch (err) {
    yield put(createWalletFailed(err.message));
  }
}

export default [
  takeEvery(CREATE_WALLET, addWalletReq),
]
