import {
  takeEvery,
  put,
  call
} from 'redux-saga/effects'
import {
  LOGIN
} from '../actions/actionTypes'
import {
  loginsuccess,
  loginfailed
} from '../actions/actionCreators'
import { login } from '../constants/config'
import { AUTHENTICATION_TOKEN } from '../constants/config';

const loginRequest = ({ email, password }) =>
  fetch(
    login,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
      },
    }
  )
    .then(async res => {
      if (res.status >= 200 && res.status < 400) { 
        return res.json(); 
      } else {
        const response = await res.json();
        throw Error(response.reason);      }
    })
    .catch(error => {
      throw error
    })

function* loginReq(action) {
  try {
    const response = yield call(loginRequest, action.payload)
    localStorage.setItem(AUTHENTICATION_TOKEN, response.token);
    yield put(loginsuccess(response))
  } catch (err) {
    yield put(loginfailed(err))
  }
}

export default [
  takeEvery(LOGIN, loginReq)
]
