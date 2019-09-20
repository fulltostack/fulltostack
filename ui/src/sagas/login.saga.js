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
var base64 = require('base-64');

const loginRequest = payload =>
  fetch(
    login,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(payload.email + ":" + payload.password),
      }
    }
  )
    .then(res => {
      if (res.status === 201) { return res.json() }

    })
    .catch(error => {
      throw error
    })

function* loginReq(action) {
  try {
    const response = yield call(loginRequest, action.payload)
    yield put(loginsuccess(response))
  } catch (err) {
    yield put(loginfailed(err))
  }
}

export default [
  takeEvery(LOGIN, loginReq)
]
