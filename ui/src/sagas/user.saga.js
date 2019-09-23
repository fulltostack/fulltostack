import {
  takeEvery,
  put,
  call
} from 'redux-saga/effects'
import { getRequest } from '../utils/api'
import { getLocalStorage } from '../utils'
import {
  GET_MY_DETAILS,
  getMyDetailsSuccess,
  getMyDetailsFailed,
} from '../actions/user.actions'
import { userDetail, AUTHENTICATION_TOKEN } from '../constants/config'

function* getMyDetailsReq() {
  try {
    const authorizationHeader = {
      Authorization: `Bearer ${getLocalStorage(AUTHENTICATION_TOKEN)}` 
    };
    
    const response = yield call(
      getRequest, 
      userDetail, 
      authorizationHeader,
    );
    yield put(getMyDetailsSuccess(response))
  } catch (err) {
    yield put(getMyDetailsFailed(err.message))
  }
}

export default [
  takeEvery(GET_MY_DETAILS, getMyDetailsReq),
]
